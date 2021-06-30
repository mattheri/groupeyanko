import { FC } from "react";
import Close from "components/SidePanel/atom/Close";
import Container from "components/SidePanel/atom/Container";

interface Props {
	onClick:() => void;
	isOpen:boolean;
}

const Panel:FC<Props> = ({ isOpen, onClick, children }) => {
	
	return(
		<Container isOpen={isOpen}>
			<Close onClick={onClick} />
			{children}
		</Container>
	);
}

export default Panel;
