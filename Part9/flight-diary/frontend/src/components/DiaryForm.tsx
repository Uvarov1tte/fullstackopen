import { useState, type SyntheticEvent } from "react";
import type { NewDiaryEntry } from "../types";

interface DiaryFormProps {
    onSubmit: (values: NewDiaryEntry) => void;
}

export const DiaryForm = (props: DiaryFormProps) => {

    const [date, setDate] = useState<string>("")
    const [visibility, setVisibility] = useState<string>("")
    const [weather, setWeather] = useState<string>("")
    const [comment, setComment] = useState<string>("")

    const submitDiary = (evt: SyntheticEvent) => {
        evt.preventDefault()
        props.onSubmit({
            date,
            visibility,
            weather,
            comment
        })

        // setDate("")
        // setVisibility("")
        // setWeather("")
        // setComment("")
    }

    return (
        <div>
            <h2>New Dairy Entry</h2>
            <form onSubmit={submitDiary}>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        type="text"
                        name="date"
                        value={date}
                        onChange={({ target }) =>
                            setDate(target.value)} />
                </div>
                <div>
                    <label htmlFor="visibility">Visibility</label>
                    <input
                        type="text"
                        name="visibility"
                        value={visibility}
                        onChange={({ target }) =>
                            setVisibility(target.value)} />
                </div>
                <div>
                    <label htmlFor="weather">Weather</label>
                    <input
                        type="text"
                        name="weather"
                        value={weather}
                        onChange={({ target }) =>
                            setWeather(target.value)} />
                </div>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <input
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={({ target }) =>
                            setComment(target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}