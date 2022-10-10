import { useState, useEffect } from 'react';
import api from '../../services/api';
import { petInterface } from '../../services/types';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ShowPetsComponent from '../../components/ShowPets/ShowPetsComponent';
import styled from 'styled-components';

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
			<Cards>
			{
				(pets === undefined) ?
					<p>Carregando!</p>
					:
					(pets.length === 0) ?
						<p>Usuario não tem pet cadastrado!</p>
						:
							pets.map((pet) => {
							return (
								<ShowPetsComponent
									pet={pet}
								/>
							);
						})

			}
			</Cards>
		</>
	);
}

const Cards = styled.div`
	margin-top: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
`;