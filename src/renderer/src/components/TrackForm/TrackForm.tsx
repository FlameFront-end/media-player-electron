import axios from 'axios'
import React, { useState } from 'react'

interface TrackFormProps {}

const TrackForm: React.FC<TrackFormProps> = () => {
	const [trackName, setTrackName] = useState<string>('')
	const [audioFile, setAudioFile] = useState<File | null>(null)

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTrackName(e.target.value)
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setAudioFile(e.target.files[0])
		}
	}

	// В функции handleSubmit в TrackForm.tsx
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!trackName || !audioFile) {
			console.error('Track name and audio file are required')
			return
		}

		const formData = new FormData()
		formData.append('title', trackName) // Изменили на 'title'
		formData.append('audio', audioFile) // Не изменяем, так как это соответствует ожидаемому на бэкенде

		try {
			await axios.post('http://localhost:3000/files', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			// Операции после успешной отправки запроса
			console.log('Track created successfully')
		} catch (error) {
			console.error('Error creating track:', error)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='trackName'>Track Name:</label>
				<input
					type='text'
					id='trackName'
					value={trackName}
					onChange={handleNameChange}
				/>
			</div>
			<div>
				<label htmlFor='audioFile'>Audio File:</label>
				<input
					type='file'
					id='audioFile'
					accept='audio/*'
					onChange={handleFileChange}
				/>
			</div>
			<button type='submit'>Create Track</button>
		</form>
	)
}

export default TrackForm
