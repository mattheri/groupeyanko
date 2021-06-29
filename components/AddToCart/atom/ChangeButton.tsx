import { FC } from "react";
import { Button } from 'components/Button/Button';
import styled from 'styled-components';

interface Props {
	onClick:() => void;
	disabled:boolean;
	isPlusButton?:boolean;
}

const StyledButton = styled(Button)<{isPlusButton:boolean}>`
	grid-row: 1;
	grid-column: ${({ isPlusButton }) => isPlusButton ? 3 : 1};
	justify-self: ${({ isPlusButton }) => isPlusButton ? 'end' : 'start'};
`;

const ChangeButton:FC<Props> = ({ onClick, disabled, isPlusButton = false }) => {
	
	return (
		<>
			<StyledButton isPlusButton={isPlusButton} disabled={disabled} onClick={onClick} primary>
				{isPlusButton ? '+' : '-'}
			</StyledButton>
		</>
	);
}

export default ChangeButton;
