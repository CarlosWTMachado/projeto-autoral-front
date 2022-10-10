import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainStyle = styled.main`
	display: flex;
	width: 100vw;
	padding: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	button {
		background-color: #000000;
		border: 2px;
		border-color: #ffffff;
		border-radius: 30px;
		border-style: ridge;
		width: 40%;
		height: 45px;
		color: #ffffff;
		font-weight: 700;
		font-size: 20px;
		margin-top: 30px;
		margin-bottom: 20px;
		display: flex;
		align-items: center;
		justify-content: center;

		@media (max-width: 600px){
			width: 100%;
			margin-top: 20px;
		}
	}
	button:hover{
		cursor: pointer;
	}
	
	@media (max-width: 600px){
		padding: 20px;
	}
`;

export const Title = styled.h1`
    font-weight: bold;
    color: #ffffff;
    font-size: 500%;
	margin-bottom: 50px;
	text-align: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const InputAndLabel = styled.div`
	width: 100%;
	margin: 15px;
	display: flex;
	align-items: center;
	justify-content: center;

	label{
		width: 13%;
		font-size: 20px;
		margin-right: 20px;

		@media (max-width: 600px){
			width: 100%;
			margin: 5px;
			text-align: center;
		}
	}
	
	input{
		width: 70%;
		height: 45px;
		padding: 15px;
		border-radius: 30px;
		border: none;
		color: #000000;
		font-size: 15px;

		@media (max-width: 600px){
			width: 100%;
			margin: 10px;
		}
	}

	@media (max-width: 600px){
		flex-direction: column;
		margin: 5px;
	}
`;

export const StyledLink = styled(Link)`
	color: #FFFFFF;
	text-decoration: none;
	text-align: center;
	font-weight: 500;
    font-size: 17px;
	margin: -10px 0px 20px 0px;
`;