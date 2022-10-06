import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { loginFormInterface } from '../services/types';
import api from '../services/api';
import Swal from 'sweetalert2';

export default function SignIn() {
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
		<MainStyle>
			<>
				<h1>Pet Walker</h1>
				<form
					onSubmit={(e) => {
						handleSendForm(e);
					}}
				>
					<label htmlFor='email'>Email</label>
					<input
						onChange={(e) => { setLoginForm({ ...loginForm, email: e.target.value }) }}
						value={loginForm.email}
						placeholder='example@email.com'
						type='email'
						id='email'
					/>
					<label htmlFor='password'>Senha</label>
					<input
						onChange={(e) => { setLoginForm({ ...loginForm, password: e.target.value }) }}
						value={loginForm.password}
						type='password'
						id='password'
					/>
					<button type='submit'>Login</button>
				</form>
				<Link to='/signup'>Ainda não tem uma conta? Cadastre-se agora!</Link>
			</>
		</MainStyle>
	);
}

const MainStyle = styled.main`
display: flex;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
h1 {
    font-family: 'Righteous', cursive;
    font-weight: bold;
    color: #ffffff;
    font-size: 52px;
    font-size: 400%;
    line-height: 50px;
    margin: -5px 0px 35px;
}
h2 {
    font-weight: bold;
    color: #ffffff;
    font-size: 25px;
    line-height: 50px;
    margin: -5px 0px;
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
button {
    background-color: #c747fc;
    border: none;
    width: 31%;
    height: 54px;
    color: #ffffff;
    font-weight: 700;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
}
button:hover{
    cursor: pointer;
}
button:disabled{
    background-color: #a09da1;
    color: #ffffff00;
}
input{
    width: 60%;
    max-width: 470px;
    height: 45px;
    padding: 18px 15px;
    border-radius: 30px;
    border: none;
    color: #000000;
    font-size: 12 px;
    margin-bottom: 13px;
}
a {
    color: #FFFFFF;
    text-decoration: none;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
}
`;