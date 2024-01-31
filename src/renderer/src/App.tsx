import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import './styles/app.scss'

import Home from './pages/Home'

const App: FC = () => {
	return (
		<>
			<div className='container'>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</div>
		</>
	)
}

export default App
