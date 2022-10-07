import { useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import { addPetFormInterface } from '../../services/types';
import { useNavigate } from 'react-router-dom';

export default function AddPet() {
	const navigate = useNavigate();
	const [petForm, setPetForm] = useState(() => {
		const form: addPetFormInterface = {
			name: '',
			vaccinated: null,
			picture: ''
		};
		return form;
	});

	function handleSendForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (
			petForm.vaccinated === null ||
			petForm.name.length === 0
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
			const promise = api.createPet({ ...petForm, vaccinated: petForm.vaccinated }, token);
			promise.then(() => {
				navigate('/pet');
			});
			promise.catch((error) => {
				if (error.response.status === 404) {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Usuario ja tem pet cadastrado com esse nome'
					});
					setPetForm({ ...petForm, name: '' });
				}
				else {
					console.error(error);
					navigate('/pet/add');
				}
			});
		}
	}

	return (
		<>
			<form
				onSubmit={handleSendForm}
			>
				<label htmlFor='name'>Name *</label>
				<input
					onChange={(e) => { setPetForm({ ...petForm, name: e.target.value }) }}
					value={petForm.name}
					placeholder='nome do pet'
					type='text'
					id='name'
				/>
				<label htmlFor='picture'>Picture</label>
				<input
					onChange={(e) => { setPetForm({ ...petForm, picture: e.target.value }) }}
					value={petForm.picture}
					placeholder='imagem do pet'
					type='text'
					id='picture'
				/>
				<label>Esta vacinado? *</label>
				<input type="radio" value="true" name="vaccinated" onChange={() => { setPetForm({ ...petForm, vaccinated: true }) }} /> Sim
				<input type="radio" value="false" name="vaccinated" onChange={() => { setPetForm({ ...petForm, vaccinated: false }) }} /> Não
				<button type='submit'>Login</button>
			</form>
		</>
	);
}