import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { useQuery } from '@apollo/client'

import {
	ALL_AUTHORS,
	ALL_BOOOKS
} from "./queries";

const App = () => {
	const [page, setPage] = useState("authors");
	const [errorMessage, setErrorMessage] = useState(null)
	const [token, setToken] = useState(null)

	const authorQuery = useQuery(ALL_AUTHORS)
	const bookQuery = useQuery(ALL_BOOOKS)

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
						<button onClick={logout}>logout</button>
					</>
				}
			</div>

			<Authors show={page === "authors"} authors={authors} />

			<Books show={page === "books"} books={books} />

			<NewBook show={page === "add"} />

			<LoginForm show={page === "login"} setToken={setToken} setError={notify} />
		</div>
	);
};

export default App;
