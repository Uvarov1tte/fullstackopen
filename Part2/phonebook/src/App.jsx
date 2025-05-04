import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	])
	const [newName, setNewName] = useState('')
	const [existed, setExisted] = useState(false)

	function handleNameChange(e) {
		const inputName = e.target.value
		setNewName(inputName)
		setExisted(persons.filter(person => person.name === inputName).length > 0)
	}

	function addPerson(e) {
		e.preventDefault()
		if (existed) {
			alert(`${newName} is already added to phonebook`)
		} else {
			setPersons(persons.concat({ name: newName }))
		}
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