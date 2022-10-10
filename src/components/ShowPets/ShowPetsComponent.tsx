import { petInterface } from '../../services/types';
import styled from 'styled-components';
import { IoPaw, IoTrash, IoPencil } from "react-icons/io5";
import Swal from 'sweetalert2';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addPetInterface } from '../../services/types';

export default function ShowPetsComponent({ pet }: { pet: petInterface }) {
	const navigate = useNavigate();
	const [editing, setEditing] = useState(false);
	const [editedData, setEditedData] = useState(() => {
		const form: addPetInterface = {
			name: '',
			vaccinated: false,
			picture: ''
		};
		return form;
	});

	function handleDelete(e: any) {
		Swal.fire({
			title: 'Tem certeza?',
			text: 'Esta ação não poderá ser defeita!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			confirmButtonText: 'deletar!'
		}).then((result) => {
			if (result.isConfirmed) {
				const token = localStorage.getItem('TOKEN');
				if (token === null) navigate('/login');
				else {
					const promise = api.deletePet(token, pet.id);
					promise.then(() => {
						Swal.fire(
							'Deletado!',
							'O pet foi deletado.',
							'success'
						);
						window.location.reload();
					}).catch((error) => {
						if (error.response.status === 498) {
							localStorage.removeItem('TOKEN');
							navigate('/login');
						}
						console.error(error);
						window.location.reload();
					});
				}

			}
		})
	}

	function handleEdit() {
		if (editing === true) {
			setEditing(false);
			setEditedData({
				name: '',
				vaccinated: false,
				picture: ''
			});
			return;
		} else {
			setEditing(true);
			setEditedData({
				name: pet.name,
				vaccinated: pet.vaccinated,
				picture: pet.picture
			});
		}
	}

	function handleSendForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (
			editedData.name.length === 0
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
			const promise = api.updatePet(editedData, token, pet.id);
			promise.then(() => {
				Swal.fire(
					'Atualizado!',
					'O pet foi atualizado.',
					'success'
				);
				window.location.reload();
			});
			promise.catch((error) => {
				if (error.response.status === 498) {
					localStorage.removeItem('TOKEN');
					navigate('/login');
				}
				else {
					console.error(error);
					window.location.reload();
				}
			});
		}
	}

	return (
		<Card id={pet.id.toString()}>
			{
				(pet.picture === undefined || pet.picture === null || pet.picture === '') ?
					<PawImage />
					:
					<img src={pet.picture} alt='imagem do pet'></img>
			}
			<Data>
				{
					(!editing) ?
						<>
							<p><h1>Nome:</h1> {pet.name}</p>
							<p><h1>Vacinado?</h1> {(pet.vaccinated) ? 'sim' : 'não'}</p>
						</>
						:
						<>
							<Form
								onSubmit={handleSendForm}
							>
								<label htmlFor='name'>Name *</label>
								<input
									onChange={(e) => { setEditedData({ ...editedData, name: e.target.value }) }}
									value={editedData.name}
									placeholder='nome do pet'
									type='text'
									id='name'
								/>
								<label htmlFor='picture'>Picture</label>
								<input
									onChange={(e) => { setEditedData({ ...editedData, picture: e.target.value }) }}
									value={editedData.picture}
									placeholder='imagem do pet'
									type='text'
									id='picture'
								/>
								<label>Esta vacinado? *</label>
								<div>
									<input type="radio" value="true" name="vaccinated" onChange={() => { setEditedData({ ...editedData, vaccinated: true }) }} checked={!!editedData.vaccinated} /> Sim
									<input type="radio" value="false" name="vaccinated" onChange={() => { setEditedData({ ...editedData, vaccinated: false }) }} checked={!editedData.vaccinated} /> Não
								</div>
								<button type='submit'>Update</button>
							</Form>
						</>
				}
			</Data>
			<Icons>
				<Pencil onClick={handleEdit} />
				<Trash onClick={handleDelete} />
			</Icons>
		</Card>
	);
}

const Card = styled.div`
	width: 70%;
	margin: 10px;
	padding: 10px;
	border: 1px;
	border-color: #ffffff;
	border-style: ridge;
	border-radius: 20px;
	display: flex;
	flex-direction: row;
	align-items: center;

	img{
		width: 100px;
		height: 100px;
		border: 1px;
		border-style: ridge;
		border-radius: 100%;
	}

	@media (max-width: 600px){
		width: 90%;
	}
`;

const Form = styled.form`
	width: 70%;
	margin: 10px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: left;

	label{
		font-weight: 500;
	}

	input{
		border: 1px;
		border-color: #ffffff;
		border-style: ridge;
		border-radius: 20px;
		padding: 5px 10px 5px 10px;
		margin: 5px 0px 5px 0px;
	}

	div input{
		margin: 5px 5px 5px 10px;
	}

	button {
		background-color: black;
		border: 2px;
		border-color: white;
		border-radius: 10px;
		border-style: ridge;
		width: 100%;
		height: 30px;
		color: #ffffff;
		font-weight: 700;
		font-size: 17px;
		margin-top: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	button:hover{
		cursor: pointer;
	}

	@media (max-width: 600px){
		width: 90%;
	}
`;

const Data = styled.div`
	margin: 10px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: left; 
	justify-content: center;

	p{
		margin: 5px;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 20px;
		@media (max-width: 600px){
			font-size: 18px;
		}
	}

	p h1{
		font-weight: 700;
		font-size: 22px;
		margin-right: 10px;
		@media (max-width: 600px){
			font-size: 20px;
		}
	}
`;

const Icons = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: right;
`;

const PawImage = styled(IoPaw)`
	width: 60px;
	height: 60px;
	margin: 15px;
`;

const Trash = styled(IoTrash)`
	margin: 0px 5px 85px 10px;
	@media (max-width: 600px){
		margin: 0px 5px 80px 5px;
	}
	:hover{
		cursor: pointer;
	}
`;

const Pencil = styled(IoPencil)`
	margin: 0px 5px 85px 10px;
	@media (max-width: 600px){
		margin: 0px 5px 80px 5px;
	}
	:hover{
		cursor: pointer;
	}
`;