import { useSelector, useDispatch } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { getNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') {
            return state = state.anecdotes
        } else {
            return state = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
        }

    })
    const dispatch = useDispatch()

    const vote = (id, anecdote) => {
        console.log('vote', id)
        dispatch(upvoteAnecdote(id, anecdote))
        dispatch(getNotification(anecdote.content))
        setTimeout(() => {
            dispatch(getNotification('NONE'))
        }, 5000);
    }

    return (
        <>
            <Notification/>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList