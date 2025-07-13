import type { DiaryEntry } from "../types"

interface EntryProp {
    entry: DiaryEntry
}

export const Entry = (props: EntryProp) => {
    const entry = props.entry
    return (
        <div>
            <h4>{entry.date}</h4>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
        </div>
    )
}