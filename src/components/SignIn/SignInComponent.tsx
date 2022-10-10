import { Link } from 'react-router-dom';
import { signInPropsType } from '../../types/signInPropsType';
import * as styles from "./style";

export default function SignInComponent({ functions, states }: signInPropsType) {
	const {
		handleSendForm,
	} = functions;
	const {
		loginForm
	} = states;

	return (
		<styles.MainStyle>
			<styles.Title>Pet Walker</styles.Title>
			<styles.Form
				onSubmit={(e) => {
					handleSendForm(e);
				}}
			>
				<styles.InputAndLabel>
					<label htmlFor='email'>Email</label>
					<input
						onChange={(e) => { loginForm.set({ ...loginForm.get, email: e.target.value }) }}
						value={loginForm.get.email}
						placeholder='example@email.com'
						type='email'
						id='email'
					/>
				</styles.InputAndLabel>
				<styles.InputAndLabel>
					<label htmlFor='password'>Senha</label>
					<input
						onChange={(e) => { loginForm.set({ ...loginForm.get, password: e.target.value }) }}
						value={loginForm.get.password}
						type='password'
						id='password'
					/>
				</styles.InputAndLabel>
				<button type='submit'>Login</button>
			</styles.Form>
			<styles.StyledLink to='/signup'>Ainda não tem uma conta? Cadastre-se agora!</styles.StyledLink>
		</styles.MainStyle>
	);
}