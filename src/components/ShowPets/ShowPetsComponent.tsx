import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { petInterface } from '../../services/types';
import styled from 'styled-components';
import { IoPaw } from "react-icons/io5";

export default function ShowPetsComponent({ pet }: { pet: petInterface }) {
	return (
		<Card>
			{
				(pet.picture === undefined || pet.picture === null || pet.picture === '') ?
					<PawImage />
					:
					<img src={pet.picture} alt='imagem do pet'></img>
			}
			<Data>
				<p><h1>Nome:</h1> {pet.name}</p>
				<p><h1>Vacinado?</h1> {(pet.vaccinated) ? 'sim' : 'não'}</p>
			</Data>
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

const PawImage = styled(IoPaw)`
	width: 60px;
	height: 60px;
	margin: 15px;
`;