const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user')
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('user')
        if (blog) {
            res.json(blog)
        } else {
            res.status(404).end()
        }
    } catch (err) {
        next(err)
    }
})

blogsRouter.post('/', async (req, res, next) => {

    const body = req.body
    const users = await User.find({})
    const id = users[0]._id

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: id
    }
    const newBlog = new Blog(blog)

    const user = await User.findById(blog.user)

    if (!user) {
        return res.status(400).json({ error: 'userId missing or not valid' })
    }
    try {
        const result = await newBlog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    try {
        const updatedblog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.json(updatedblog)
    } catch (err) {
        next(err)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

module.exports = blogsRouter