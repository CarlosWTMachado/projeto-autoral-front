import { signUpPropsType } from "../../types/signUpPropsType";
import { Link } from 'react-router-dom';
import { Input, MainStyle, Title } from "./style";

export default function LoginComponent({ functions, states }: signUpPropsType) {
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
		<MainStyle>
			<Title>Pet Walker</Title>
			<form
				onSubmit={handleSendForm}
			>
				<div>
					<label htmlFor='fullName'>Nome Completo *</label>
					<Input
						onChange={(e) => { user.set({ ...user.get, fullName: e.target.value }) }}
						value={user.get.fullName}
						placeholder='Nome Completo'
						type='text'
						id='fullName'
					/>
				</div>
				<label htmlFor='email'>Email *</label>
				<Input
					onChange={(e) => { user.set({ ...user.get, email: e.target.value }) }}
					value={user.get.email}
					placeholder='example@email.com'
					type='email'
					id='email'
				/>
				<label htmlFor='password'>Senha *</label>
				<Input
					onChange={(e) => { user.set({ ...user.get, password: e.target.value }) }}
					value={user.get.password}
					type='password'
					id='password'
				/>
				<label htmlFor='confirmPassword'>Repita a Senha *</label>
				<Input
					onChange={(e) => { user.set({ ...user.get, confirmPassword: e.target.value }) }}
					value={user.get.confirmPassword}
					type='password'
					id='confirmPassword'
				/>
				<label htmlFor='addresscep'>CEP *</label>
				<Input
					onChange={handleCep}
					onKeyDown={preventCursorChange}
					onBlur={getAddressData}
					onClick={e => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
					value={address.get.cep}
					type='text'
					id='addresscep'
				/>
				<label>Logradouro</label>
				<Input
					value={cepAddress.get.logradouro}
					type='text'
					disabled
				/>
				<label>Bairro</label>
				<Input
					value={cepAddress.get.bairro}
					type='text'
					disabled
				/>
				<label>Cidade</label>
				<Input
					value={cepAddress.get.localidade}
					type='text'
					disabled
				/>
				<label>UF</label>
				<Input
					value={cepAddress.get.uf}
					type='text'
					disabled
				/>
				<label htmlFor='addressnumber'>Number *</label>
				<Input
					onChange={(e) => { address.set({ ...address.get, number: Number(e.target.value) }) }}
					value={Number(address.get.number).toString()}
					type='number'
					id='addressnumber'
				/>
				<label htmlFor='addresscomplement'>Complement</label>
				<Input
					onChange={(e) => { address.set({ ...address.get, complement: e.target.value }) }}
					value={address.get.complement}
					placeholder='apt x ...etc'
					type='text'
					id='addresscomplement'
				/>
				<label htmlFor='phones'>Phone *</label>
				<Input
					onChange={handlePhone}
					onKeyDown={preventCursorChange}
					onClick={e => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
					value={user.get.phones[0]}
					placeholder='(xx) 9xxxx-xxxx'
					type='tel'
					pattern="\([0-9]{2}\)[0-9]{5}-[0-9]{4}"
					id='phones'
				/>
				<button type='submit'>Cadastrar</button>
			</form>
			<Link to='/login'>Já tem uma conta? Entre agora!</Link>
		</MainStyle>
	);
}