import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import login from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './index.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({ text: null, type: 'success' })

    function renderMessage(newMsg, type) {
        setMessage({ text: newMsg, type: type })
        setTimeout(() => {
            setMessage({ ...message, text: null })
        }, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await login.login({
                username, password,
            })
            setUser(user)
            console.log(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            renderMessage('Wrong credentials', 'error')
        }
        console.log('logging in with', username, password)
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    return (
        <div>
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
                    <p>{user.name} logged in</p>
                    <BlogList blogs={blogs} />
                </>
            }
        </div>
    )
}

export default App