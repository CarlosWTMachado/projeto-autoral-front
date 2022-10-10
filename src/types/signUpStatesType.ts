import { userInterface, addressInterface, getAddressByCepData } from "../services/types"

export type signUpStatesType = {
	user: {
		get: userInterface,
		set: React.Dispatch<React.SetStateAction<userInterface>>
	},
	address: {
		get: addressInterface,
		set: React.Dispatch<React.SetStateAction<addressInterface>>
	},
	cepAddress: {
		get: getAddressByCepData,
		set: React.Dispatch<React.SetStateAction<getAddressByCepData>>
	}
}