const { ApolloServer } = require('@apollo/server')
const { v1: uuid } = require('uuid')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const helper = require('./db_helper')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const User = require('./models/user')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('connected to MongoDB')
        await Author.deleteMany({})
        await Author.insertMany(helper.initialAuthors)
        await Book.deleteMany({})
        let initialBooks = []
        for (let book of helper.initialBooks) {
            const result = await Author.find({ "name": book.author })
            // console.log(a)
            const bookToSave = { ...book, author: result[0]._id }
            initialBooks.push(bookToSave)
        }
        // console.log(initialBooks)
        await Book.insertMany(initialBooks)
        await User.deleteMany({})
        await User.insertMany(helper.initialUsers)
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })


const typeDefs = `
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(
            author: String
            genre: String
        ): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Book{
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Author{
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        addAuthor(
            name: String!
            born: Int
        ): Author
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            const allBooks = await Book.find().populate('author')
            if (!args.author && !args.genre) {
                return allBooks
            }

            const byAuthor = (book) => {
                if (!args.author) {
                    return book
                }

                return args.author === book.author.name ? book : !book
            }

            const byGenre = (book) => {
                if (!args.genre) {
                    return book
                }

                return book.genres.includes(args.genre) ? book : !book
            }

            return allBooks.filter(byAuthor).filter(byGenre)
        },
        allAuthors: async (root, args) => {
            return Author.find()
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },

    Author: {
        bookCount: async (root) => {
            const allBooks = await Book.find().populate('author')
            return allBooks.filter(book => book.author.name === root.name).length
        }
    },

    Mutation: {
        addBook: async (root, args) => {
            const allBooks = await Book.find().populate('author')
            const allAuthors = await Author.find()
            if (allBooks.find(p => p.title === args.title)) {
                throw new GraphQLError('Title must be unique', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title
                    }
                })
            }

            if (args.title.length < 5) {
                throw new GraphQLError('Title must be longer than 5 characters', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title
                    }
                })
            }

            if (args.author.length < 4) {
                throw new GraphQLError('Author must be longer than 4 characters', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title
                    }
                })
            }

            let authorExisted = false
            for (let a of allAuthors) {
                if (a.name === args.author.name) {
                    authorExisted = true
                    break
                }
            }

            let author
            if (!authorExisted) {
                const newAuthor = new Author({
                    name: args.author,
                    born: null,
                })
                
                author = await newAuthor.save()
            } else {
                const result = allAuthors.find(a => a.name === args.name)
                author = result[0]
            }

            const bookToSave = new Book({
                title: args.title,
                published: args.published,
                author: author._id,
                genres: args.genres
            })

            const savedBook = await bookToSave.save()

            return savedBook
        },

        editAuthor: async (root, args) => {
            const allAuthors = await Author.find()
            const author = allAuthors.find(a => a.name === args.name)
            if (!author) {
                return null
            }

            const toUpdate = {
                name: args.name,
                born: args.setBornTo
            }

            let updatedAuthor

            try {
                updatedAuthor = await Author.findByIdAndUpdate(author._id, toUpdate, { new: true })
            } catch (err) {
                console.log(err)
            }
            return updatedAuthor
        },

        createUser: async (root, args) => {
            if (await User.findOne({ username: args.username })) {
                throw new GraphQLError('User must be unique', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username
                    }
                })
            }

            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre
            })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            error
                        }
                    })
                })
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})