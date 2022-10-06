import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signUpInterface, userInterface, addressInterface, getAddressByCepData } from '../services/types';
import api from '../services/api';
import Swal from 'sweetalert2';

export default function SignUp() {
	const navigate = useNavigate();
	const [user, setUser] = useState(() => {
		const user: userInterface = {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
			phones: ['']
		};
		return user;
	});
	const [address, setAddress] = useState(() => {
		const address: addressInterface = {
			cep: '',
			number: 0,
			complement: ''
		};
		return address;
	});
	const [cepAddress, setCepAddress] = useState(() => {
		const address: getAddressByCepData = {
			logradouro: '',
			bairro: '',
			localidade: '',
			uf: ''
		};
		return address;
	});

	function handleSendForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (
			user.fullName.length === 0 ||
			user.email.length === 0 ||
			user.password.length === 0 ||
			user.confirmPassword.length === 0 ||
			address.cep.length === 0 ||
			address.number === 0 ||
			user.phones.length === 0
		) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Todos os campos marcados com * são obrigatórios'
			});
			return;
		}

		if (user.password !== user.confirmPassword) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Senhas Diferentes!'
			});
			setUser({ ...user, password: '', confirmPassword: '' });
			return;
		}

		const registerForm: signUpInterface = {
			fullName: user.fullName,
			email: user.email,
			password: user.password,
			address: address,
			phones: user.phones
		}

		const promise = api.signUp(registerForm);
		promise.then(() => {
			navigate('/login');
		});
		promise.catch((error) => {
			if (error.response.status === 409) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Email já cadastrado!'
				});
			}
			else {
				console.error(error);
			}
			setUser({
				fullName: '',
				email: '',
				password: '',
				confirmPassword: '',
				phones: ['']
			});
			setAddress({
				cep: '',
				number: 0,
				complement: ''
			});
			setCepAddress({
				logradouro: '',
				bairro: '',
				localidade: '',
				uf: ''
			});
		});
	}

	function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
		const lastChar = e.target.value.slice(-1);
		if (e.target.value.length <= user.phones[0].length) {
			setUser({ ...user, phones: [user.phones[0].slice(0, -1)] });
			return;
		}
		if (
			lastChar === ' ' ||
			isNaN(Number(lastChar)) ||
			user.phones[0].length === 14
		) return;
		if (user.phones[0].length === 0) {
			setUser({ ...user, phones: [`(${lastChar}`] });
			return;
		}
		if (user.phones[0].length === 3) {
			setUser({ ...user, phones: [`${user.phones[0]})${lastChar}`] });
			return;
		}
		if (user.phones[0].length === 9) {
			setUser({ ...user, phones: [`${user.phones[0]}-${lastChar}`] });
			return;
		}
		setUser({ ...user, phones: [`${user.phones[0]}${lastChar}`] });
	}

	function handleCep(e: React.ChangeEvent<HTMLInputElement>) {
		const lastChar = e.target.value.slice(-1);
		if (e.target.value.length <= address.cep.length) {
			setAddress({ ...address, cep: address.cep.slice(0, -1) });
			return;
		}
		if (
			lastChar === ' ' ||
			isNaN(Number(lastChar)) ||
			address.cep.length === 9
		) return;
		if (address.cep.length === 5) {
			setAddress({ ...address, cep: `${address.cep}-${lastChar}` });
			return;
		}
		setAddress({ ...address, cep: `${address.cep}${lastChar}` });
	}

	function preventCursorChange(e: React.KeyboardEvent<HTMLInputElement>) {
		const code = e.code;
		if (
			code === 'ArrowLeft' ||
			code === 'ArrowRight' ||
			code === 'ArrowUp' ||
			code === 'ArrowDown' ||
			code === 'Home' ||
			code === 'End' ||
			code === 'PageUp' ||
			code === 'PageDown'
		) e.preventDefault();
	}

	function getAddressData() {
		if (address.cep.length === 9) {
			setCepAddress({
				logradouro: '...',
				bairro: '...',
				localidade: '...',
				uf: '...'
			});
			api.getAddressByCep(address.cep).then((cepData) => {
				if (cepData === undefined) {
					setAddress({ ...address, cep: '' });
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'CEP invalido tente digitar novamente'
					});
					return;
				} else {
					setCepAddress(cepData);
				}
			}).catch((e) => {
				console.error(e);
				setAddress({ ...address, cep: '' });
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Ocorreu um erro tente novamente'
				});
			})
		}
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
					<label htmlFor='fullName'>Nome Completo *</label>
					<input
						onChange={(e) => { setUser({ ...user, fullName: e.target.value }) }}
						value={user.fullName}
						placeholder='Nome Completo'
						type='text'
						id='fullName'
					/>
					<label htmlFor='email'>Email *</label>
					<input
						onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
						value={user.email}
						placeholder='example@email.com'
						type='email'
						id='email'
					/>
					<label htmlFor='password'>Senha *</label>
					<input
						onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
						value={user.password}
						type='password'
						id='password'
					/>
					<label htmlFor='confirmPassword'>Repita a Senha *</label>
					<input
						onChange={(e) => { setUser({ ...user, confirmPassword: e.target.value }) }}
						value={user.confirmPassword}
						type='password'
						id='confirmPassword'
					/>
					<label htmlFor='addresscep'>CEP *</label>
					<input
						onChange={handleCep}
						onKeyDown={preventCursorChange}
						onBlur={getAddressData}
						onClick={e => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
						value={address.cep}
						type='text'
						id='addresscep'
					/>
					<label>Logradouro</label>
					<input
						value={cepAddress.logradouro}
						type='text'
						disabled
					/>
					<label>Bairro</label>
					<input
						value={cepAddress.bairro}
						type='text'
						disabled
					/>
					<label>Cidade</label>
					<input
						value={cepAddress.localidade}
						type='text'
						disabled
					/>
					<label>UF</label>
					<input
						value={cepAddress.uf}
						type='text'
						disabled
					/>
					<label htmlFor='addressnumber'>Number *</label>
					<input
						onChange={(e) => { setAddress({ ...address, number: Number(e.target.value) }) }}
						value={Number(address.number).toString()}
						type='number'
						id='addressnumber'
					/>
					<label htmlFor='addresscomplement'>Complement</label>
					<input
						onChange={(e) => { setAddress({ ...address, complement: e.target.value }) }}
						value={address.complement}
						placeholder='apt x ...etc'
						type='text'
						id='addresscomplement'
					/>
					<label htmlFor='phones'>Phone *</label>
					<input
						onChange={handlePhone}
						onKeyDown={preventCursorChange}
						onClick={e => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
						value={user.phones[0]}
						placeholder='(xx) 9xxxx-xxxx'
						type='tel'
						pattern="\([0-9]{2}\)[0-9]{5}-[0-9]{4}"
						id='phones'
					/>
					<button type='submit'>Cadastrar</button>
				</form>
				<Link to='/login'>Já tem uma conta? Entre agora!</Link>
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