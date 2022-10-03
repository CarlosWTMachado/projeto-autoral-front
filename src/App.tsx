import {
	BrowserRouter,
	Routes,
	Route
} from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<div>Login</div>} />
				<Route path='*' element={<div>Not found!</div>} />
			</Routes>
		</BrowserRouter>
	)
}