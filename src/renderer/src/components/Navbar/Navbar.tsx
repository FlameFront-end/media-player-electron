import { Menu } from 'antd'
import { Link } from 'react-router-dom'

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
			<Item key='home'>
				<Link to='/' style={{ color: 'blue' }}>
					Home
				</Link>
			</Item>
			<Item key='tracks'>
				<Link to='/tracks' style={{ color: 'blue' }}>
					Tracks
				</Link>
			</Item>
			<Item key='images'>
				<Link to='/images' style={{ color: 'blue' }}>
					Images
				</Link>
			</Item>
		</Menu>
	)
}

export default Navbar
