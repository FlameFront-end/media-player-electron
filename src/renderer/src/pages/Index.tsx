import { Col, Row } from 'antd'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'

import { AudioPlayer, PageWrapper, TrackForm } from '../components'

import { normalizeURL } from '../helpers/normalizeURL'
import { Track } from '../types'

const Home: FC = () => {
	const [tracks, setTracks] = useState<Track[]>([])

	useEffect(() => {
		const fetchTracks = async () => {
			try {
				const response = await axios.get('http://localhost:3000/track')
				setTracks(response.data)
			} catch (error) {
				console.error('Error fetching tracks:', error)
			}
		}

		fetchTracks()
	}, [])

	return (
		<PageWrapper>
			<TrackForm />
			<div>
				<h2 className='title'>All Tracks</h2>
				<Row gutter={[20, 20]}>
					{tracks.map(track => (
						<Col key={track.id} xs={4} sm={12} xl={6}>
							<AudioPlayer
								src={normalizeURL(track.audio, 'track')}
								previewImage={normalizeURL(track.image, 'track')}
								title={track.title}
							/>
						</Col>
					))}
				</Row>
			</div>
		</PageWrapper>
	)
}

export default Home
