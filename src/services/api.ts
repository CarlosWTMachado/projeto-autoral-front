import axios from 'axios';
import { signUpInterface, getAddressByCepData, loginFormInterface } from './types';

const BASE_URL = 'http://localhost:5000';

export function createHeaders(token: string) {
	return { headers: { Authorization: `Bearer ${token}` } };
}

export async function signUp(formData: signUpInterface) {
	const promise = axios.post(`${BASE_URL}/signup`, formData)
	return promise;
}

export async function signIn(formData: loginFormInterface) {
	const promise = axios.post(`${BASE_URL}/signin`, formData)
	return promise;
}

export async function getAddressByCep(cep: string) {
	const { data } = await axios.get(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
	if (data.erro !== undefined) return undefined;
	const { logradouro, bairro, localidade, uf }: getAddressByCepData = data;
	return { logradouro, bairro, localidade, uf };
}

// async function createComment(token, text, postId) {
// 	const auth = createHeaders(token)
// 	const body = { text, postId }
// axios.post("http://localhost:5000/signup", registerUser);
// 	const promise = await axios.post(`${BASE_URL}/comments`, body, auth)
// 	return promise;
// }
// async function getComments(token, postId) {
// 	const auth = createHeaders(token);
// 	const promise = await axios.get(`${BASE_URL}/comments/${postId}`, auth);
// 	return promise;
// }
// async function commentsCounter(postId, token) {
// 	const auth = createHeaders(token);
// 	const promise = await axios.get(`${BASE_URL}/comments/counter/${postId}`, auth);
// 	return promise;
// }
// 
// async function getFollowStatus(userToVerify, token) {
// 	const auth = createHeaders(token);
// 	const promise = await axios.get(`${BASE_URL}/followers/${userToVerify}`, auth);
// 
// 	return promise;
// }
// 
const api = {
	BASE_URL,
	signUp,
	signIn,
	getAddressByCep,
}

export default api;