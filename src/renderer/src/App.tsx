import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import './styles/app.scss'

import Index from './pages'

const App: FC = () => {
	return (
		<>
			<div className='container'>
				<Routes>
					<Route path='/' element={<Index />} />
				</Routes>
			</div>
		</>
	)
}

export default App
