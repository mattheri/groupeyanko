import { FC } from "react";
import Button from 'components/Button/Button'

interface Props {
	onClick:() => void;
	isOpen:boolean;
}

const CategoriesPanelToggle:FC<Props> = ({ isOpen, onClick }) => {

	return(
		<Button tertiary onClick={onClick}>
			Catégories
		</Button>
	);
}

export default CategoriesPanelToggle;
