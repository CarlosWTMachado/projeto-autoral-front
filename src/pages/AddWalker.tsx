import { useState } from 'react';
import api from '../services/api';
import Swal from 'sweetalert2';
import { addWalkerFormInterface } from '../types/addWalkerFormInterface';
import { useNavigate } from 'react-router-dom';

export default function AddWalker() {
	const navigate = useNavigate();
	const [walkerForm, setWalkerForm] = useState(() => {
		const form: addWalkerFormInterface = {
			cpf: '',
			picture: ''
		};
		return form;
	});

	function handleSendForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (
			walkerForm.cpf.length === 0 ||
			walkerForm.picture.length === 0
		) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Preencha todos os campos'
			});
			return;
		}

		const token = localStorage.getItem('TOKEN');
		if (token === null) navigate('/login');
		else {
			const promise = api.createWalker(walkerForm, token);
			promise.then(() => {
				navigate('/');
			});
			promise.catch((error: any) => {
				if (error.response.status === 409) {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Usuario ja cadastrado como passeador'
					});
					navigate('/');
				}
				if (error.response.status === 498) {
					localStorage.removeItem('TOKEN');
					navigate('/login');
				}
				else {
					console.error(error);
					navigate('/pet');
				}
			});
		}
	}

	return (
		<>
			<form
				onSubmit={handleSendForm}
			>
				<label htmlFor='cpf'>CPF *</label>
				<input
					onChange={(e) => { setWalkerForm({ ...walkerForm, cpf: e.target.value }) }}
					value={walkerForm.cpf}
					placeholder='xxx.xxx.xxx-xx'
					type='text'
					id='cpf'
				/>
				<label htmlFor='picture'>Picture</label>
				<input
					onChange={(e) => { setWalkerForm({ ...walkerForm, picture: e.target.value }) }}
					value={walkerForm.picture}
					placeholder='imagem do usuario'
					type='text'
					id='picture'
				/>
				<button type='submit'>Login</button>
			</form>
		</>
	);
}