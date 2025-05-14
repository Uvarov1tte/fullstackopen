import Blog from "./Blog"

const BlogList = ({ blogs }) => {
    return (
        <>
            <h2>All blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog._id} blog={blog} />
            )}
        </>
    )
}

export default BlogList