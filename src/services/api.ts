import axios from 'axios';
import { addWalkerFormInterface } from '../types/addWalkerFormInterface';
import { signUpInterface, getAddressByCepData, loginFormInterface, addPetInterface } from './types';

const BASE_URL = 'http://localhost:5000';

export function createHeaders(token: string) {
	return { headers: { Authorization: `Bearer ${token}` } };
}

export async function signUp(formData: signUpInterface) {
	const promise = axios.post(`${BASE_URL}/signup`, formData);
	return promise;
}

export async function signIn(formData: loginFormInterface) {
	const promise = axios.post(`${BASE_URL}/signin`, formData);
	return promise;
}

export async function getAddressByCep(cep: string) {
	const { data } = await axios.get(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
	if (data.erro !== undefined) return undefined;
	const { logradouro, bairro, localidade, uf }: getAddressByCepData = data;
	return { logradouro, bairro, localidade, uf };
}

export async function createPet(formData: addPetInterface, token: string) {
	const auth = createHeaders(token);
	const promise = axios.post(`${BASE_URL}/pet`, formData, auth);
	return promise;
}

export async function createWalker(formData: addWalkerFormInterface, token: string) {
	const auth = createHeaders(token);
	const promise = axios.post(`${BASE_URL}/walker/register`, formData, auth);
	return promise;
}

export async function getPet(token: string) {
	const auth = createHeaders(token);
	const promise = axios.get(`${BASE_URL}/pets`, auth);
	return promise;
}

export async function deletePet(token: string, petId: number) {
	const auth = createHeaders(token);
	const promise = axios.delete(`${BASE_URL}/pet/${petId}`, auth);
	return promise;
}

export async function updatePet(formData: addPetInterface, token: string, petId: number) {
	const auth = createHeaders(token);
	const promise = axios.put(`${BASE_URL}/pet/${petId}`, formData, auth);
	return promise;
}

const api = {
	BASE_URL,
	signUp,
	signIn,
	getAddressByCep,
	createPet,
	getPet,
	createWalker,
	deletePet,
	updatePet
}

export default api;