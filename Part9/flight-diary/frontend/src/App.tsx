import { useEffect, useState } from 'react'
import axios from 'axios';
import { DiaryForm } from './components/DiaryForm'
import { AllEntries } from './components/AllEntries'
import diaryServices from './services/diaries'
import type { DiaryEntry, NewDiaryEntry } from './types'
import { Notification } from './components/Notification';

function App() {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([])
	const [message, setMessage] = useState<string | null>(null)

	useEffect(() => {
		diaryServices
			.getAll()
			.then(res => {
				setDiaries(res)
			})
	}, [])

	const setNotification = (msg: string) => {
		setMessage(msg)
		setTimeout(() => {
			setMessage(null)
		}, 5000);
	}

	const submitDiary = async (values: NewDiaryEntry) => {
		try {
			const addedDiary = await diaryServices.create(values)
			setDiaries(diaries.concat(addedDiary))
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				if (err?.response?.data && typeof err?.response?.data === "string") {
					const message = err.response.data.replace('Something went wrong. Error: ', '');
					console.error(message);
					setNotification(message);
				} else {
					setNotification("Unrecognized axios error");
				}
			} else {
				console.error("Unknown error", err);
				setNotification("Unknown error");
			}
		}
	}

	return (
		<>
			<Notification message={message} />
			<DiaryForm onSubmit={submitDiary} />
			<AllEntries entries={diaries} />
		</>
	)
}

export default App
