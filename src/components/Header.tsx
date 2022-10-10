import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
	return (
		<HeaderContainer>
			<Title>Pet Walker</Title>
			<Links>
				<StyledLink to='/pet'>pet</StyledLink>
				<StyledLink to='/walker/add'>walker</StyledLink>
				<StyledLink to='/walk/add'>walk</StyledLink>
			</Links>
		</HeaderContainer>
	);
}

const HeaderContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 70px;
	background-color: black;
	box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.2);
	align-items: center;
	display: flex;
	flex-direction: row;
	border: 2px;
	border-color: #ffffff;
	border-style: ridge;
`;

const Title = styled.h1`
	margin-left: 15px;
	margin-right: 15px;
    font-weight: bold;
    color: #ffffff;
    font-size: 20px;
	text-align: center;
	@media (max-width: 600px){
		width: 50px;
	}
`;

const Links = styled.div`
	margin: 0px 10px 0px 10px;
	width: 100%;
	display: flex;
	justify-content: right;
`;

const StyledLink = styled(Link)`
	color: #FFFFFF;
	text-decoration: none;
	text-align: center;
	font-weight: 500;
    font-size: 17px;
	margin: 0px 3% 0px 3%;
	width: 75px;
	height: 35px;
	padding: 7px;
	border: 1px;
	border-color: #ffffff;
	border-style: ridge;
	border-radius: 15px;
	align-items: center;
	justify-content: center;

	@media (max-width: 600px){
		margin: 0px 2% 0px 2%;
	}
`;