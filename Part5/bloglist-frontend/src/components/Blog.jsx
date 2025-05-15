import Togglable from "./Togglable"

const Blog = ({ blog }) => (
    <div>
        <div>{blog.title}</div>
        <Togglable buttonLabel={view}>
            <>
                <div>{blog.url}</div>
                <div>Likes: {blog.likes} <button>Like</button></div>
                <div>{blog.author}</div>
            </>
        </Togglable>
    </div>
)

export default Blog