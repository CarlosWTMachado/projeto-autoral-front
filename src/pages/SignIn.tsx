import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginFormInterface } from '../services/types';
import api from '../services/api';
import Swal from 'sweetalert2';
import SignInComponent from '../components/SignIn/SignInComponent';

export default function SignIn() {
	const navigate = useNavigate();
	const [loginForm, setLoginForm] = useState(() => {
		const form: loginFormInterface = {
			email: '',
			password: ''
		};
		return form;
	});

	function handleSendForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (
			loginForm.email.length === 0 ||
			loginForm.password.length === 0
		) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Preencha todos os campos'
			});
			return;
		}

		const promise = api.signIn(loginForm);
		promise.then(({ data }) => {
			const { token } = data;
			localStorage.setItem('TOKEN', token);
			navigate('/pet');
		});
		promise.catch((error) => {
			if (error.response.status === 404) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Email e/ou Senha incorretos'
				});
				setLoginForm({ ...loginForm, password: '' });
			}
			if (error.response.status === 400) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Senha deve ter no minimo 10 caracteres'
				});
				setLoginForm({ ...loginForm, password: '' });
			}
			else {
				console.error(error);
				setLoginForm({ email: '', password: '' });
			}
		});
	}

	return (
		<SignInComponent
			functions={{
				handleSendForm
			}}
			states={{
				loginForm: { get: loginForm, set: setLoginForm }
			}}
		/>
	);
}