import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { HomePage, ImagesPage, TracksPage } from '../pages'
import { IRoutes } from '../types'

export const routes: IRoutes[] = [
	{ path: '/', element: <HomePage />, title: 'Home' },
	{ path: '/images', element: <ImagesPage />, title: 'Images' },
	{ path: '/tracks', element: <TracksPage />, title: 'Tracks' }
]
const AppRoutes: FC = () => {
	return (
		<Routes>
			{routes.map((item, index) => (
				<Route key={index} path={item.path} element={item.element} />
			))}
		</Routes>
	)
}

export default AppRoutes
