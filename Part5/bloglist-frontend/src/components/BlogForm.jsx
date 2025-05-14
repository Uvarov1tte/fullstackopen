const BlogForm = ({ addBlog, author, setAuthor, title, setTitle, url, setUrl }) => (
    <div>
        <h4>New Blog</h4>
        <form onSubmit={addBlog}>
            <div>Title
                <input
                    value={title}
                    onChange={({target})=>setTitle(target.value)}
                /></div>
            <div>Author
                <input
                    value={author}
                    onChange={({target})=>setAuthor(target.value)}
                /></div>
            <div>URL
                <input
                    value={url}
                    onChange={({target})=>setUrl(target.value)}
                />
            </div>
            <button type="submit">save</button>
        </form>
    </div>
)

export default BlogForm
