import { FC } from "react";
import ForwardButton from "./ForwardButton";
import LastPageButton from "./LastPageButton";
import ControlsContainer from "../atom/ControlsContainer";

interface Props {
	onNextPage:() => void;
	onLastPage:() => void;
	active:number;
	length:number;
}

const NextControls:FC<Props> = ({ onNextPage, onLastPage, active, length }) => {
	return (
		<ControlsContainer>
			<ForwardButton active={active} length={length} toggle={onNextPage} />
			<LastPageButton active={active} length={length} toggle={onLastPage} />
		</ControlsContainer>
	);
}

export default NextControls;
