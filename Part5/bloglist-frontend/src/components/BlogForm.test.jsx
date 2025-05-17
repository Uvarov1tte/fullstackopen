import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm addBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const sendButton = screen.getByText('save')

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test url')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test title')
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
    expect(createBlog.mock.calls[0][0].url).toBe('test url')
})