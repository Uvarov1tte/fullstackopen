const express = require('express')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)

app.use(express.json())

module.exports = app