import { FC } from "react";
import FirstPageButton from "./FirstPageButton";
import BackButton from "./BackButton";
import ControlsContainer from "../atom/ControlsContainer";

interface Props {
	onFirstPage:() => void;
  onPreviousPage:() => void;
  active:number;
}

const BackControls:FC<Props> = ({ onFirstPage, onPreviousPage, active }) => {

	return (
		<ControlsContainer>
			<FirstPageButton active={active} toggle={onFirstPage} />
			<BackButton active={active} toggle={onPreviousPage} />
		</ControlsContainer>
	);
};

export default BackControls;
