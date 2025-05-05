export default function CountriesList({ list }) {
    if (list.length == 1) {
        return null
    }

    return (
        <> {list.length < 10
            ? list.map((c) => <p key={c}>{c}</p>)
            : <p>Too many matches, specify another filter</p>
        }
        </>

    )
}