import { Col, Row } from 'antd'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'

import { AudioPlayer, Loader, PageWrapper, TrackForm } from '../components'

import { normalizeURL } from '../helpers/normalizeURL'
import { ITrackResponse } from '../types'

const TracksPage: FC = () => {
	const [tracks, setTracks] = useState<ITrackResponse[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchTracks = async () => {
			try {
				const response = await axios.get('http://localhost:3000/track')
				setTracks(response.data)
				setIsLoading(false)
			} catch (error) {
				console.error('Error fetching tracks:', error)
			}
		}

		fetchTracks()
	}, [])

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`http://localhost:3000/track/${id}`)
			setTracks(prevState => prevState.filter(item => item.id !== id))
		} catch (error) {
			console.error('Error deleting video:', error)
		}
	}

	return (
		<PageWrapper>
			<TrackForm />
			<h2 className='title'>All Tracks</h2>
			{isLoading ? (
				<Loader />
			) : (
				<Row gutter={[20, 20]}>
					{tracks.map(track => (
						<Col key={track.id} xs={4} sm={12} xl={6}>
							<AudioPlayer
								src={normalizeURL(track.audio, 'track')}
								previewImage={normalizeURL(track.image, 'track')}
								title={track.title}
								id={track.id}
								handleDelete={handleDelete}
							/>
						</Col>
					))}
				</Row>
			)}
		</PageWrapper>
	)
}

export default TracksPage
