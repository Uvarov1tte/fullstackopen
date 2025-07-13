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
    }

    return (
        <div>
            <h2>New Dairy Entry</h2>
            <form onSubmit={submitDiary}>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={({ target }) =>
                            setDate(target.value)} />
                </div>
                <div>
                    Visibility
                    <span>
                        <input
                            type="radio"
                            id="great"
                            name="visibility"
                            value="great"
                            onChange={({ target }) =>
                                setVisibility(target.value)} />
                        <label htmlFor="great">great</label>
                    </span>
                    <span>
                        <input
                            type="radio"
                            id="good"
                            name="visibility"
                            value="good"
                            onChange={({ target }) =>
                                setVisibility(target.value)} />
                        <label htmlFor="good">good</label>
                    </span>
                    <span>
                        <input
                            type="radio"
                            id="ok"
                            name="visibility"
                            value="ok"
                            onChange={({ target }) =>
                                setVisibility(target.value)} />
                        <label htmlFor="ok">ok</label>
                    </span>
                    <span>
                        <input
                            type="radio"
                            id="poor"
                            name="visibility"
                            value="poor"
                            onChange={({ target }) =>
                                setVisibility(target.value)} />
                        <label htmlFor="poor">poor</label>
                    </span>

                </div>
                <div>
                    Weather
                    <span>
                        <input
                            type="radio"
                            id="sunny"
                            name="weather"
                            value="sunny"
                            onChange={({ target }) =>
                                setWeather(target.value)} />
                        <label htmlFor="sunny">sunny</label>
                    </span>
                    <span>
                        <input
                            type="radio"
                            id="rainy"
                            name="weather"
                            value="rainy"
                            onChange={({ target }) =>
                                setWeather(target.value)} />
                        <label htmlFor="rainy">rainy</label>
                    </span>
                    <span>
                        <input
                            type="radio"
                            id="cloudy"
                            name="weather"
                            value="cloudy"
                            onChange={({ target }) =>
                                setWeather(target.value)} />
                        <label htmlFor="cloudy">cloudy</label>
                    </span>
                    <span>
                        <input
                            type="radio"
                            id="stormy"
                            name="weather"
                            value="stormy"
                            onChange={({ target }) =>
                                setWeather(target.value)} />
                        <label htmlFor="stormy">stormy</label>
                    </span>
                    <span>
                        <input
                            type="radio"
                            id="windy"
                            name="weather"
                            value="windy"
                            onChange={({ target }) =>
                                setWeather(target.value)} />
                        <label htmlFor="windy">windy</label>
                    </span>

                </div>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <input
                        type="text"
                        id="comment"
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