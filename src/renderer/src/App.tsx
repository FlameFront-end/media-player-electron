import { FC } from 'react'

import './styles/app.scss'

import AppRoutes from './routes/AppRoutes'

const App: FC = () => {
	return (
		<div className='container'>
			<AppRoutes />
		</div>
	)
}

export default App
