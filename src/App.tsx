import {
	BrowserRouter,
	Routes,
	Route
} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AddPet from './pages/pets/AddPet';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<SignIn />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/pet/add' element={<AddPet />} />
				<Route path='*' element={<div>Not found!</div>} />
			</Routes>
		</BrowserRouter>
	)
}