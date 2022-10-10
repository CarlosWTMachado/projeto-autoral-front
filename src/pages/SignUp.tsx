import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpInterface, userInterface, addressInterface, getAddressByCepData } from '../services/types';
import api from '../services/api';
import Swal from 'sweetalert2';
import LoginComponent from '../components/Signin/LoginComponent';

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

	const handleSendForm = (e: React.FormEvent<HTMLFormElement>) => {
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

	const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
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

	const handleCep = (e: React.ChangeEvent<HTMLInputElement>) => {
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
		// <MainStyle>
		<LoginComponent
			functions={{
				handleCep,
				handlePhone,
				handleSendForm,
				getAddressData
			}}
			states={{
				user: { get: user, set: setUser },
				address: { get: address, set: setAddress },
				cepAddress: { get: cepAddress, set: setCepAddress }
			}}
		/>
		// </MainStyle>
	);
}