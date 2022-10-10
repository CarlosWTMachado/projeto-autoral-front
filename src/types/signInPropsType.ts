import { loginFormInterface } from "../services/types"

export interface signInPropsType {
	functions: {
		handleSendForm: (e: React.FormEvent<HTMLFormElement>) => void,
	},
	states: {
		loginForm: {
			get: loginFormInterface,
			set: React.Dispatch<React.SetStateAction<loginFormInterface>>
		},
	}
}