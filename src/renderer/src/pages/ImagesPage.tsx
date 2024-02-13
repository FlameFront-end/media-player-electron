import { Col, Image, Row } from 'antd'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'

import { ImageForm, Loader, PageWrapper } from '../components'

import { normalizeURL } from '../helpers/normalizeURL'
import { IImageResponse } from '../types'

const ImagesPage: FC = () => {
	const [images, setImages] = useState<IImageResponse[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await axios.get('http://localhost:3000/image')
				setImages(response.data)
				setIsLoading(false)
			} catch (error) {
				console.error('Error fetching images:', error)
			}
		}

		fetchImages()
	}, [])

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`http://localhost:3000/image/${id}`)
			setImages(prevState => prevState.filter(item => item.id !== id))
		} catch (error) {
			console.error('Error deleting image:', error)
		}
	}

	return (
		<PageWrapper>
			<ImageForm />
			<h2 className='title'>All Images</h2>
			{isLoading ? (
				<Loader />
			) : (
				<Row gutter={[20, 20]}>
					{images.map(image => (
						<Col key={image.id} xs={4} sm={12} xl={6}>
							<div className='item'>
								<h4 className='title-cat'>{image.title}</h4>
								<Image
									src={normalizeURL(image.image, 'image')}
									alt='Track Preview'
								/>
								<button
									className='delete'
									onClick={() => handleDelete(image.id)}
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

export default ImagesPage
