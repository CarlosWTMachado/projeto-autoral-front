import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
	const navigate = useNavigate();
	useEffect(() => { navigate('/login'); }, [])

	// const token = localStorage.getItem('TOKEN');
	// if (token === null) navigate('/login');

	return (
		<>

		</>
	);
}