import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import './styles/app.scss'

import { HomePage, ImagesPage, TracksPage } from './pages'

const App: FC = () => {
	return (
		<div className='container'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/images' element={<ImagesPage />} />
				<Route path='/tracks' element={<TracksPage />} />
			</Routes>
		</div>
	)
}

export default App
