import { useState, useEffect } from 'react'
import { Input } from './components/Input';
import { List } from './components/List';
import { Filter } from './components/Filter';
import personsService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])

	useEffect(() => {
		personsService
			.getAll()
			.then(response => {
				console.log('promise fulfilled', response)
				setPersons(response)
			})
	}, [])

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
				number: newNumber
			}
			personsService
				.create(contact)
				.then(res => {
					setPersons(persons.concat(res))
					setNewName('')
					setNewNumber('')
				})
		}
	}

	function handleFilterChange(e) {
		setFilter(e.target.value)
	}

	function deletePerson() {

	}

	const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))


	return (
		<div>
			<h2>Phonebook</h2>
			<Filter label='filter shown with' onChange={handleFilterChange} value={filter} type='text' />
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
			<List persons={personsToShow} onDelete={deletePerson} />
		</div>
	)
}

export default App