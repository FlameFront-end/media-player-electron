import { Link } from 'react-router-dom'

import s from './Navbar.module.scss'

const Navbar = () => {
	return (
		<nav className={s.nav}>
			<ul className={s.list}>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
