export interface signUpInterface {
	email: string,
	password: string,
	fullName: string,
	address: addressInterface,
	phones: string[]
}

export interface addressInterface {
	cep: string,
	number: number,
	complement?: string
}

export interface userInterface {
	email: string,
	password: string,
	confirmPassword: string
	fullName: string,
	phones: string[]
}

export interface getAddressByCepData {
	logradouro: string,
	bairro: string,
	localidade: string,
	uf: string,
}

export interface loginFormInterface {
	email: string,
	password: string,
}

export interface addPetFormInterface {
	name: string,
	picture?: string,
	vaccinated: boolean | null
}

export interface addPetInterface {
	name: string,
	picture?: string,
	vaccinated: boolean
}

export interface petInterface {
	id: number,
	name: string,
	picture?: string,
	vaccinated: boolean,
	ownerId: number
}