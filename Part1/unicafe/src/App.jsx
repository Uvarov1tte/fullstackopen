import { useState } from 'react'
import Button from './assets/Button'
import Stats from './assets/Stats'

export default function App() {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [all, setAll] = useState(0)

	const addGood = () => {
		setGood(good+1)
	}

	const addNeutral = () => {
		setNeutral(neutral + 1)
	}

	const addBad = () => {
		setBad(bad + 1)
	}

	return (
		<>
			<h1>give feedback</h1>
			<div>
				<Button onClick={addGood} name="good"></Button>
				<Button onClick={addNeutral} name="neutral"></Button>
				<Button onClick={addBad} name="bad"></Button>
			</div>

			<h1>statistics</h1>
			<div>
				<Stats name="good" stats={good}></Stats>
				<Stats name="neutral" stats={neutral}></Stats>
				<Stats name="bad" stats={bad}></Stats>
			</div>
		</>
	)
}
