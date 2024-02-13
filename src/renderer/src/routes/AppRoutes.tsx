import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ImagesPage, TracksPage, VideoPage } from '../pages'
import { IRoutes } from '../types'

export const routes: IRoutes[] = [
	{ path: '/', element: <ImagesPage />, title: 'Images' },
	{ path: '/tracks', element: <TracksPage />, title: 'Tracks' },
	{ path: '/videos', element: <VideoPage />, title: 'Videos' }
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
