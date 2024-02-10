import { Col, Row } from 'antd'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'

import '../styles/app.scss'

import { AudioPlayer, PageWrapper, TrackForm } from '../components'

import audioImg from '../assets/img.jpg'

import { Track } from '../types'

const Home: FC = () => {
	const [tracks, setTracks] = useState<Track[]>([])

	useEffect(() => {
		const fetchTracks = async () => {
			try {
				const response = await axios.get<Track[]>('http://localhost:3000/files')
				setTracks(response.data)
			} catch (error) {
				console.error('Error fetching tracks:', error)
			}
		}

		fetchTracks()
	}, [])

	const getURLFromAudio = (track: string) => {
		return `http://localhost:3000/uploads/audio/${track}`
	}

	return (
		<PageWrapper>
			<TrackForm />
			<div>
				<h2 className='title'>All Tracks</h2>
				<Row gutter={[16, 16]}>
					{tracks.map(track => (
						<Col key={track.id} xs={24} sm={12} md={8} lg={6}>
							<div>
								<AudioPlayer
									src={getURLFromAudio(track.audio)}
									previewImage={audioImg}
									title={track.title}
								/>
							</div>
						</Col>
					))}
				</Row>
			</div>
		</PageWrapper>
	)
}

export default Home
