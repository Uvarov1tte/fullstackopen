import { useState } from 'react'
import { Input } from './assets/Input';
import { List } from './assets/List';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])

	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [existed, setExisted] = useState(false)
	const [filter, setFilter] = useState('')

	function handleNameChange(e) {
		const inputName = e.target.value
		setNewName(inputName)
		setExisted(persons.filter(person => person.name === inputName).length > 0)
	}

	function handleNumberChange(e) {
		setNewNumber(e.target.value)
	}

	function addPerson(e) {
		e.preventDefault()
		if (existed) {
			alert(`${newName} is already added to phonebook`)
		} else {
			const contact = {
				name: newName,
				number: newNumber,
				id: persons.length + 1
			}
			setPersons(persons.concat(contact))
		}
	}

	function handleFilterChange(e) {
		setFilter(e.target.value)
	}

	const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))


	return (
		<div>
			<h2>Phonebook</h2>
			<Input label='filter shown with' onChange={handleFilterChange} value={filter} type='text' />
			<h2>add a new</h2>
			<form>
				<div>
					<Input label='name' onChange={handleNameChange} value={newName} type='text' />
					<Input label='number' onChange={handleNumberChange} value={newNumber} type='text' />
				</div>
				<div>
					<button onClick={addPerson} type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<List persons={personsToShow} />
		</div>
	)
}

export default App