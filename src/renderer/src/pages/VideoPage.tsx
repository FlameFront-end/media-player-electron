import { Col, Row } from 'antd'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import { PageWrapper, VideoForm } from '../components'

import { normalizeURL } from '../helpers/normalizeURL'
import { IVideoResponse } from '../types'

const VideoPage: FC = () => {
	const [videos, setVideos] = useState<IVideoResponse[]>([])

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const response = await axios.get('http://localhost:3000/video')
				setVideos(response.data)
			} catch (error) {
				console.error('Error fetching videos:', error)
			}
		}

		fetchVideos()
	}, [])

	return (
		<PageWrapper>
			<VideoForm />
			<h2 className='title'>All Videos</h2>
			<Row gutter={[20, 20]}>
				{videos.map(video => (
					<Col key={video.id} xs={4} sm={11} xl={11}>
						<div className='item'>
							<h4 className='title'>{video.title}</h4>
							<ReactPlayer
								url={normalizeURL(video.video, 'video')}
								controls={true}
								width='600px'
								height='auto'
							/>
						</div>
					</Col>
				))}
			</Row>
		</PageWrapper>
	)
}

export default VideoPage
