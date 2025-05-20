import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'
import NewAnecdote from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteList/>
            <NewAnecdote/>
        </div>
    )
}

export default App