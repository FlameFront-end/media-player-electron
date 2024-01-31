import { FC, ReactNode } from 'react'

import s from './Button.module.scss'

interface ButtonProps {
	children: ReactNode
	onClick: () => void
	disabled?: boolean
}

const Button: FC<ButtonProps> = ({ children, onClick, disabled }) => {
	return (
		<button onClick={onClick} disabled={disabled} className={s.button}>
			{children}
		</button>
	)
}

export default Button
