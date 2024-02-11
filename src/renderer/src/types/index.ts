import { ReactNode } from 'react'

export interface ITrackResponse {
	id: number
	title: string
	audio: string
	image: string
}

export interface IImageResponse {
	id: number
	title: string
	image: string
}

export interface IRoutes {
	path: string
	element: ReactNode
	title: string
}
