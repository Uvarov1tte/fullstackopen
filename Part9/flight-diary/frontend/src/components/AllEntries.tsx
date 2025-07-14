import type { DiaryEntry } from "../types"
import { Entry } from "./Entry"

interface AllEntriesProp {
    entries: DiaryEntry[]
}

export const AllEntries = (props: AllEntriesProp) => {
    const entries = props.entries

    return (
        <div>
            <h2>Dairy entries</h2>
            {entries.map((e) => <Entry key={e.id} entry={e} />)}
        </div>
    )
}