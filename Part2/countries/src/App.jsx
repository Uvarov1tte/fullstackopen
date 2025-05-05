import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Country from './components/Country';
import countriesService from "./services/countries";

function App() {
	const [countries, setCountries] = useState([])
	const [query, setQuery] = useState('')
	const [selected, setSelected] = useState(null)

	useEffect(() => {
		countriesService
			.getAll()
			.then(res => {
				console.log('promise fulfilled', res)
				const list = []
				for (let i of res) {
					list.push(i.name)
				}
				setCountries(list)
			})
	}, [])

	function handleQueryOnChange(evt) {
		setQuery(evt.target.value)
		if (countriesToShow.length == 1) {
			countriesService
				.getOne(countriesToShow[0])
				.then(res => {
					setSelected(res)
				})
		}

	}

	const countriesToShow = query != ''
		? countries.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
		: []

	return (
		<>
			<Filter label='find countries' onChange={handleQueryOnChange} type='text' value={query} />
			{countriesToShow.length == 1
				? <Country country={selected} />
				: {
					countriesToShow.length < 10
						? countriesToShow.map((c) => <p key={c}>{c}</p>)
						: <p>Too many matches, specify another filter</p>
				}}
		</>
	)
}

export default App
