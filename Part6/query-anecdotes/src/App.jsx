import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/requests'
import { useNotifDispatch } from './components/NotificationContext'

const App = () => {
    const notifDispatch = useNotifDispatch()
    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    const handleVote = async (anecdote) => {
        updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        await notifDispatch({ type: 'SHOW', payload: `You have voted for the following anecdote: ${anecdote.content}` })
        setTimeout(() => {
            notifDispatch({ type: 'HIDE', payload: '' })
        }, 5000)
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes
    })
    console.log(JSON.parse(JSON.stringify(result)))

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    if (result.isError) {
        return <div>anecdote servide not available due to problems in server</div>
    }

    const anecdotes = result.data
    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
