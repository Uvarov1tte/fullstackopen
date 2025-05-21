import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'
import { useNotifDispatch } from './NotificationContext'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const notifDispatch = useNotifDispatch()

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        },
        onError: async () => {
            await notifDispatch({ type: 'SHOW', payload: `Too short anecdote, must have length 5 or more` })
            setTimeout(() => {
                notifDispatch({ type: 'HIDE', payload: '' })
            }, 5000)
        }
    })

    const onCreate = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate({ content, votes: 0 })
        await notifDispatch({ type: 'SHOW', payload: `You have created ${content}` })
        setTimeout(() => {
            notifDispatch({ type: 'HIDE', payload: '' })
        }, 5000)
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
