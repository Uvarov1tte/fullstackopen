import { useState } from 'react'
import Button from './assets/Button'
import Stats from './assets/Stats'

export default function App() {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [all, setAll] = useState(0)
	const [average, setAverage] = useState(0)
	const [positive, setPositive] = useState("0 %")

	const addGood = () => {

		const newGood = good + 1
		const newAll = all + 1

		setGood(newGood)
		setAll(newAll)
		setAverage((newGood - bad) / newAll)
		setPositive((newGood / newAll * 100).toString() + " %")

	}

	const addNeutral = () => {

		const newAll = all + 1

		setNeutral(neutral + 1)
		setAll(newAll)
		setAverage((good - bad) / newAll)
		setPositive((good / newAll * 100).toString() + " %")

	}

	const addBad = () => {

		const newBad = bad + 1
		const newAll = all + 1

		setBad(newBad)
		setAll(newAll)
		setAverage((good - newBad) / newAll)
		setPositive((good / newAll * 100).toString() + " %")

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
				<Stats name="all" stats={all}></Stats>
				<Stats name="average" stats={average}></Stats>
				<Stats name="positive" stats={positive}></Stats>
			</div>
		</>
	)
}
