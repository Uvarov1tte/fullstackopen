import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
    }

    return (
        <>
            <h2>Add new anecdote</h2>
            <form onSubmit={addAnecdote}>
                <input name="note" />
                <button type="submit">add</button>
            </form>
        </>
    )
}

export default NewAnecdote