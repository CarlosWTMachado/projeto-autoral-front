import { useNavigate } from 'react-router-dom';

export default function Home() {
	const navigate = useNavigate();

	const token = localStorage.getItem('TOKEN');
	if (token === null) navigate('/login');

	return (
		<>

		</>
	);
}