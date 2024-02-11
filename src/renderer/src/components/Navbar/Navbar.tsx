import { Menu } from 'antd'
import { Link } from 'react-router-dom'

import { routes } from '../../routes/AppRoutes'

const { Item } = Menu

const Navbar = () => {
	return (
		<Menu
			mode='horizontal'
			theme='light'
			style={{
				backgroundColor: 'white',
				display: 'flex',
				justifyContent: 'center'
			}}
		>
			{routes.map((item, index) => (
				<Item key={index}>
					<Link to={item.path} style={{ color: 'blue' }}>
						{item.title}
					</Link>
				</Item>
			))}
		</Menu>
	)
}

export default Navbar
