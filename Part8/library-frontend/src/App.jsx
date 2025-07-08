import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from '@apollo/client'

import {
	ALL_AUTHORS,
	ALL_BOOOKS
} from "./queries";

const App = () => {
	const [page, setPage] = useState("authors");

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

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				<button onClick={() => setPage("add")}>add book</button>
			</div>

			<Authors show={page === "authors"} authors={authors} />

			<Books show={page === "books"} books={books} />

			<NewBook show={page === "add"} />
		</div>
	);
};

export default App;
