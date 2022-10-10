import styled from 'styled-components';

export const Input = styled.input`
	width: 60%;
    max-width: 470px;
    height: 45px;
    padding: 18px 15px;
    border-radius: 30px;
    border: none;
    color: #000000;
    font-size: 12 px;
    margin-bottom: 13px;
`;

export const MainStyle = styled.main`
	display: flex;
	width: 100vw;
	height: 100vh;
	padding: 25px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media (max-width: 600px){
		background-color: lightblue;
	}
`;

export const Title = styled.h1`
    font-weight: bold;
    color: #ffffff;
    font-size: 500%;
    line-height: 50px;
    margin: 0px 0px 50px;
`;

// h1 {
    
// }
// h2 {
//     font-weight: bold;
//     color: #ffffff;
//     font-size: 25px;
//     line-height: 50px;
//     margin: -5px 0px;
// }
// form {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     width: 100%;
// }
// button {
//     background-color: #c747fc;
//     border: none;
//     width: 31%;
//     height: 54px;
//     color: #ffffff;
//     font-weight: 700;
//     font-size: 20px;
//     margin-top: 10px;
//     margin-bottom: 36px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: 30px;
// }
// button:hover{
//     cursor: pointer;
// }
// button:disabled{
//     background-color: #a09da1;
//     color: #ffffff00;
// }
// a {
//     color: #FFFFFF;
//     text-decoration: none;
//     font-weight: 700;
//     font-size: 15px;
//     line-height: 18px;
// }
