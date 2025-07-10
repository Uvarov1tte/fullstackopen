import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { useQuery, useApolloClient } from '@apollo/client'

import {
	ALL_AUTHORS,
	ALL_BOOKS,
	LOGGED_IN_USER
} from "./queries";
import Recommendations from "./components/Recommendations";

const App = () => {
	const [page, setPage] = useState("authors");
	const [errorMessage, setErrorMessage] = useState(null)
	const [token, setToken] = useState(null)
	const [genre, setGenre] = useState(null)
	const client = useApolloClient()

	const authorQuery = useQuery(ALL_AUTHORS)
	const allBooks = useQuery(ALL_BOOKS)
	const bookQuery = useQuery(ALL_BOOKS, {
		variables: { genre }
	})

	if (authorQuery.loading) {
		return <div>loading authors...</div>
	}

	const authors = authorQuery.data.allAuthors

	if (bookQuery.loading) {
		return <div>loading books...</div>
	}

	const books = bookQuery.data.allBooks

	const notify = (message) => {
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 10000)
	}

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	const allGenres = []
	for (let b of allBooks.data.allBooks) {
		// console.log(b)
		for (let g of b.genres) {
			if (!allGenres.includes(g)) {
				allGenres.push(g)
			}
		}
	}

	return (
		<div>
			{!token ? <Notify errorMessage={errorMessage} /> : <></>}

			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>

				{!token ?
					<button onClick={() => setPage("login")}>login</button>
					:
					<>
						<button onClick={() => setPage("add")}>add book</button>
						<button onClick={() => setPage("recommend")}>recommendations</button>
						<button onClick={logout}>logout</button>
					</>
				}
			</div>

			<Authors show={page === "authors"} authors={authors} />

			<Books show={page === "books"} books={books} genres={allGenres} filter={setGenre} />

			<NewBook show={page === "add"} />

			{token ? <Recommendations show={page === "recommend"} /> : <></>}
			<LoginForm show={page === "login"} setToken={setToken} setError={notify} />
		</div>
	);
};

export default App;
