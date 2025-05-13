const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
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

    const blog = new Blog(req.body)
    const user = await User.findById(body.userId)

    if (!user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }
    try {
        const result = await blog.save()
        res.status(201).json(result)
        if (result) { }
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