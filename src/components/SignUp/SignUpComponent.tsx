import { signUpPropsType } from "../../types/signUpPropsType";
import * as styles from "./style";

export default function SignUpComponent({ functions, states }: signUpPropsType) {
	const {
		handleCep,
		handlePhone,
		handleSendForm,
		getAddressData
	} = functions;
	const {
		user,
		address,
		cepAddress
	} = states;

	function preventCursorChange(e: React.KeyboardEvent<HTMLInputElement>) {
		const code = e.code;
		if (
			code === 'ArrowLeft' ||
			code === 'ArrowRight' ||
			code === 'ArrowUp' ||
			code === 'ArrowDown' ||
			code === 'Home' ||
			code === 'End' ||
			code === 'PageUp' ||
			code === 'PageDown'
		) e.preventDefault();
	}

	return (
		<styles.MainStyle>
			<styles.Title>Pet Walker</styles.Title>
			<styles.Form
				onSubmit={handleSendForm}
			>
				<styles.InputAndLabel>
					<label htmlFor='fullName'>Nome Completo *</label>
					<input
						onChange={(e) => { user.set({ ...user.get, fullName: e.target.value }) }}
						value={user.get.fullName}
						placeholder='Nome Completo'
						type='text'
						id='fullName'
					/>
				</styles.InputAndLabel>
				<styles.InputAndLabel>
					<label htmlFor='email'>Email *</label>
					<input
						onChange={(e) => { user.set({ ...user.get, email: e.target.value }) }}
						value={user.get.email}
						placeholder='example@email.com'
						type='email'
						id='email'
					/>
				</styles.InputAndLabel>
				<styles.InputAndLabel>
					<label htmlFor='password'>Senha *</label>
					<input
						onChange={(e) => { user.set({ ...user.get, password: e.target.value }) }}
						value={user.get.password}
						type='password'
						id='password'
					/>
				</styles.InputAndLabel>
				<styles.InputAndLabel>
					<label htmlFor='confirmPassword'>Repita a Senha *</label>
					<input
						onChange={(e) => { user.set({ ...user.get, confirmPassword: e.target.value }) }}
						value={user.get.confirmPassword}
						type='password'
						id='confirmPassword'
					/>
				</styles.InputAndLabel>
				<styles.InputAndLabel>
					<label htmlFor='addresscep'>CEP *</label>
					<input
						onChange={handleCep}
						onKeyDown={preventCursorChange}
						onBlur={getAddressData}
						onClick={e => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
						value={address.get.cep}
						type='text'
						id='addresscep'
					/>
				</styles.InputAndLabel>
				<styles.InputAndLabel>
					<label>Logradouro</label>
					<input
						value={cepAddress.get.logradouro}
						type='text'
						disabled
					/>
				</styles.InputAndLabel>
				<styles.InputAndLabel>
					<label>Bairro</label>
					<input
						value={cepAddress.get.bairro}
						type='text'
						disabled
					/>
				</styles.InputAndLabel>
				<styles.InputAndLabel>
					<label>Cidade</label>
					<input
						value={cepAddress.get.localidade}
						type='text'
						disabled
					/>
				</styles.InputAndLabel>
				<styles.InputAndLabel>
					<label>UF</label>
					<input
						value={cepAddress.get.uf}
						type='text'
						disabled
					/>
				</styles.InputAndLabel>
				<styles.InputAndLabel>
					<label htmlFor='addressnumber'>Numero *</label>
					<input
						onChange={(e) => { address.set({ ...address.get, number: Number(e.target.value) }) }}
						value={Number(address.get.number).toString()}
						type='number'
						id='addressnumber'
					/>
				</styles.InputAndLabel>
				<styles.InputAndLabel>
					<label htmlFor='addresscomplement'>Complemento</label>
					<input
						onChange={(e) => { address.set({ ...address.get, complement: e.target.value }) }}
						value={address.get.complement}
						placeholder='apt x ...etc'
						type='text'
						id='addresscomplement'
					/>
				</styles.InputAndLabel>
				<styles.InputAndLabel>
					<label htmlFor='phones'>Telefone *</label>
					<input
						onChange={handlePhone}
						onKeyDown={preventCursorChange}
						onClick={e => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
						value={user.get.phones[0]}
						placeholder='(xx) 9xxxx-xxxx'
						type='tel'
						pattern="\([0-9]{2}\)[0-9]{5}-[0-9]{4}"
						id='phones'
					/>
				</styles.InputAndLabel>
				<button type='submit'>Cadastrar</button>
			</styles.Form>
			<styles.StyledLink to='/login'>Já tem uma conta? Entre agora!</styles.StyledLink>
		</styles.MainStyle>
	);
}