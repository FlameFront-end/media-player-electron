import { FC } from 'react'

import './Loader.scss'

const Loader: FC = () => {
	return (
		<div className='lds-ellipsis'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Loader
