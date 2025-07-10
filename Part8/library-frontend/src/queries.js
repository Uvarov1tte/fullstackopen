import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query filterGenre($genre: String){
        allBooks (
            genre: $genre
        ) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            title
            published
            author
            genres
            id
        }
    }
`

export const CHANGE_BIRTHYEAR = gql`
    mutation changeBirthyear($name: String!, $year: Int!){
        editAuthor(
            name: $name
            setBornTo: $year
        ) {
            name
            born
            id
            bookCount
        }
    }    
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password)  {
            value
        }
    }
`

export const LOGGED_IN_USER = gql`
    query {
        me {
            id
            username
            favoriteGenre
        }
    }
`