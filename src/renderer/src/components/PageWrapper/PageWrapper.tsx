import { FC, ReactNode } from 'react'

import s from './PageWrapper.module.scss'

interface PageWrapperProps {
	children: ReactNode
}

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
	return <div className={s.wrapper}>{children}</div>
}

export default PageWrapper
