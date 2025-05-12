const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    try {
        const blog = new Blog(req.body)
        const result = await blog.save()
        res.status(201).json(result)
        res.status(201).json(result)
    } catch (err) {
        res.status(400).end()
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedblog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedblog)
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = blogsRouter