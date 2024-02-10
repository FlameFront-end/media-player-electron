import axios from 'axios'
import { FC, useEffect, useState } from 'react'

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

	return (
		<PageWrapper>
			<TrackForm />
			<div>
				<h2 className='title'>All Tracks</h2>
				<div className='wrapper'>
					{tracks.map(track => (
						<div className='item' key={track.id}>
							<AudioPlayer
								src={track.audio}
								previewImage={audioImg}
								title={track.title}
							/>
						</div>
					))}
				</div>
			</div>
		</PageWrapper>
	)
}

export default Home
