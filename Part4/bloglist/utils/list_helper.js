const ld = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    for (let i of blogs) {
        total += i.likes
    }
    return total
}

const favoriteBlog = (blogs) => {
    let blog = blogs[0]
    for (let i of blogs) {
        if (i.likes >= blog.likes) {
            blog = i
        }
    }
    return blog
}

const mostBlogs = (blogs) => {

    const count = ld.countBy(blogs, 'author')
    console.log(count)

    let max = 0
    let topBlogger
    for (let a of Object.keys(count)) {
        if (count[a] > max) {
            max = count[a]
            topBlogger = a
        }
    }

    return topBlogger
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}