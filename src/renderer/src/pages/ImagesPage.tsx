import { Col, Image, Row } from 'antd'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'

import { ImageForm, PageWrapper } from '../components'

import { normalizeURL } from '../helpers/normalizeURL'
import { IImageResponse } from '../types'

const ImagesPage: FC = () => {
	const [images, setImages] = useState<IImageResponse[]>([])

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await axios.get('http://localhost:3000/image')
				setImages(response.data)
			} catch (error) {
				console.error('Error fetching tracks:', error)
			}
		}

		fetchImages()
	}, [])

	return (
		<PageWrapper>
			<ImageForm />
			<h2 className='title'>All Images</h2>
			<Row gutter={[20, 20]}>
				{images.map(item => (
					<Col key={item.id} xs={4} sm={12} xl={6}>
						<div className='item'>
							<h4 style={{ textAlign: 'center' }}>{item.title}</h4>
							<Image
								src={normalizeURL(item.image, 'image')}
								alt='Track Preview'
							/>
						</div>
					</Col>
				))}
			</Row>
		</PageWrapper>
	)
}

export default ImagesPage
