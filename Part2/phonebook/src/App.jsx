import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	])
	const [newName, setNewName] = useState('')
	function handleNameChange(e) {
		setNewName(e.target.value)
	}
	function addPerson(e) {
		e.preventDefault()
		setPersons(persons.concat({ name: newName }))
		console.log(persons)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					name: <input onChange={handleNameChange} value={newName} />
				</div>
				<div>
					<button onClick={addPerson} type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((p) => <p key={p.name}>{p.name}</p>)}
		</div>
	)
}

export default App