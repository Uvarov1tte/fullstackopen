import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Country from './components/Country';
import countriesService from "./services/countries";
import CountriesList from './components/CountriesList';

function App() {
	const [countries, setCountries] = useState([])
	const [query, setQuery] = useState('')
	const [selected, setSelected] = useState(null)

	const countriesToShow = query != ''
		? countries.filter(c => c.toLowerCase().includes(query.toLowerCase()))
		: []

	useEffect(() => {
		countriesService
			.getAll()
			.then(res => {
				console.log('promise fulfilled', res)
				const list = []
				for (let i of res) {
					list.push(i.name.common)
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
		} else {
			setSelected(null)
		}

	}



	return (
		<>
			<Filter label='find countries' onChange={handleQueryOnChange} type='text' value={query} />
			<CountriesList list={countriesToShow} />
			<Country country={selected} />
		</>
	)
}

export default App
