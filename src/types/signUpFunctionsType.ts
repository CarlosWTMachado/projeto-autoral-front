export type signUpFunctionsType = {
	handleCep: (e: React.ChangeEvent<HTMLInputElement>) => void,
	handlePhone: (e: React.ChangeEvent<HTMLInputElement>) => void,
	handleSendForm: (e: React.FormEvent<HTMLFormElement>) => void,
	getAddressData: () => void
}