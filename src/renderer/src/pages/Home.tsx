import { FC } from 'react'

import { AudioPlayer, PageWrapper } from '../components'

import audio from '../assets/gorod.mp3'
import audioImg from '../assets/img.jpg'

const Home: FC = () => {
	return (
		<PageWrapper>
			<AudioPlayer src={audio} previewImage={audioImg} />
		</PageWrapper>
	)
}

export default Home
