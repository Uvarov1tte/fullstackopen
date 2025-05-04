export function List({ persons, onDelete }) {
    return (
        <>
            <table>
                <tbody>
                    {persons.map((p) => <tr key={p.id}><td>{p.name}</td><td>{p.number}</td><td><button onClick={onDelete}>Delete</button></td></tr>)}
                </tbody>
            </table>

        </>
    )
}