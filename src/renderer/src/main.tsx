import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<HashRouter>
		<App />
	</HashRouter>
)
