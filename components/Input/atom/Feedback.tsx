import styled from "styled-components";
import { FC } from "react";

interface Props {
	error:string;
	touched:boolean;
}

const Feedback = styled.small`
	color: red;
	position: absolute;
`;

const InputFeedback:FC<Props> = ({ error, touched }) => {
	
	return(
		error && touched ? <Feedback>{error}</Feedback> : null
	);
}

export default InputFeedback;
