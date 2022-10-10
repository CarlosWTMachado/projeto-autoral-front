import { useState, useEffect } from 'react';
import api from '../../services/api';
import { petInterface } from '../../services/types';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

export default function ShowPets() {
	const navigate = useNavigate();
	const [pets, setPets] = useState(() => {
		let pets: petInterface[] | undefined;
		return pets;
	});

	function getPets() {
		const token = localStorage.getItem('TOKEN');
		if (token === null) navigate('/login');
		else {
			const promise = api.getPet(token);
			promise.then(({ data }: { data: petInterface[] }) => {
				setPets(data);
			});
			promise.catch((error) => {
				if (error.response.status === 498) {
					localStorage.removeItem('TOKEN');
					navigate('/login');
				}
				console.error(error);
				navigate('/pet');
			});
		}
	}

	useEffect(() => { getPets() }, []);

	return (
		<>
			<Header />
			{
				(pets === undefined) ?
					<p>Carregando!</p>
					:
					(pets.length === 0) ?
						<p>Usuario não tem pet cadastrado!</p>
						:
						pets.map((pet) => {
							console.log(pets)
							return (
								<div>
									<p>Nome: {pet.name}</p>
									<p>Vacinado? {(pet.vaccinated) ? 'sim' : 'não'}</p>
									<img src={pet.picture} alt='foto do pet' width='100px' height='100px'></img>
								</div>
							)
						})

			}
		</>
	);
}