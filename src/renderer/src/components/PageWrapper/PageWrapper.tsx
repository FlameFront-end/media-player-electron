import { FC, ReactNode } from 'react'

import s from './PageWrapper.module.scss'

import { Navbar } from '../index'

interface PageWrapperProps {
	children: ReactNode
}

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
	return (
		<div className={s.wrapper}>
			<Navbar />
			{children}
		</div>
	)
}

export default PageWrapper
