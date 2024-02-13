import { Col, Row } from 'antd'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import { Loader, PageWrapper, VideoForm } from '../components'

import { normalizeURL } from '../helpers/normalizeURL'
import { IVideoResponse } from '../types'

const VideoPage: FC = () => {
	const [videos, setVideos] = useState<IVideoResponse[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const response = await axios.get('http://localhost:3000/video')
				setVideos(response.data)
				setIsLoading(false)
			} catch (error) {
				console.error('Error fetching videos:', error)
			}
		}

		fetchVideos()
	}, [])

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`http://localhost:3000/video/${id}`)
			setVideos(prevState => prevState.filter(item => item.id !== id))
		} catch (error) {
			console.error('Error deleting video:', error)
		}
	}

	return (
		<PageWrapper>
			<VideoForm />
			<h2 className='title'>All Videos</h2>
			{isLoading ? (
				<Loader />
			) : (
				<Row gutter={[20, 20]}>
					{videos.map(video => (
						<Col key={video.id} xs={4} sm={11} xl={11}>
							<div className='item'>
								<h4 className='title-cat'>{video.title}</h4>
								<ReactPlayer
									url={normalizeURL(video.video, 'video')}
									controls={true}
									width='600px'
									height='auto'
								/>
								<button
									className='delete'
									onClick={() => handleDelete(video.id)}
								>
									Delete
								</button>
							</div>
						</Col>
					))}
				</Row>
			)}
		</PageWrapper>
	)
}

export default VideoPage
