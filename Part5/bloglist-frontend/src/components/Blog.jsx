import Togglable from './Togglable'

const Blog = ({ blog, updateLike, removeBlog }) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle} className='blog'>
            <div>{blog.title} by {blog.author}</div>
            <Togglable buttonLabel={'view'}>
                <>
                    <div>{blog.url}</div>
                    <div>Likes: {blog.likes} <button onClick={() => updateLike(blog)}>Like</button></div>
                    {blog.user && <div>added by {blog.user.name}</div>}
                    <button onClick={() => removeBlog(blog)}>Remove</button>
                </>
            </Togglable>
        </div>
    )
}

export default Blog