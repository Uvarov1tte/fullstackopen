export function List({ persons }) {
    return (
        <>
            <table>
                <tbody>
                    {persons.map((p) => <tr key={p.id}><td>{p.name}</td><td>{p.number}</td></tr>)}
                </tbody>
            </table>

        </>
    )
}