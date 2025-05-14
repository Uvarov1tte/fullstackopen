import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import './index.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({ text: null, type: 'success' })
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')

    function renderMessage(newMsg, type) {
        setMessage({ text: newMsg, type: type })
        setTimeout(() => {
            setMessage({ ...message, text: null })
        }, 5000)
    }

    useEffect(() => {

        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )

    }, [])

    useEffect(() => {

        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }

    }, [])

    const handleLogin = async (event) => {

        event.preventDefault()
        try {

            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

        } catch (exception) {

            renderMessage('Wrong credentials', 'error')

        }

        console.log('logging in with', username, password)

    }

    const handleLogOut = async (event) => {
        window.localStorage.clear()
        setUser(null)
        console.log('logged out')
    }

    const addBlog = async (event) => {
        event.preventDefault()
        try {

            const newBlog = {
                title: title,
                author: author,
                url: url
            }

            setAuthor('')
            setTitle('')
            setUrl('')

            const blog = await blogService.create(newBlog)
            console.log(blog)
            setBlogs(blogs.concat(blog))
            renderMessage(`added new blog ${blog.title} by ${blog.author}`, 'success')

        } catch (exception) {

            renderMessage('Invalid values', 'error')

        }
    }


    return (

        <>
            <Notification message={message} />
            {user === null &&
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            }

            {user !== null &&
                <>
                    <h2>blogs</h2>
                    <p>{user.name} logged in </p>
                    <button onClick={handleLogOut}>Log out</button>
                    <BlogForm
                        addBlog={addBlog}
                        author={author}
                        setAuthor={setAuthor}
                        title={title}
                        setTitle={setTitle}
                        url={url}
                        setUrl={setUrl}
                    />
                    <BlogList blogs={blogs} />
                </>
            }
        </>

    )
}

export default App