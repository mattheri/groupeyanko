import Link from "components/Link/Link";
import { FC } from "react";
import styled from "styled-components";
import theme from "theme/theme";

interface Props {
	categoryName:string;
	url:string;
	onClick:() => void;
}

const Item = styled.li`
	margin: 2rem 0;
	margin: 0;
	width: 100%;
	display: flex;
	text-decoration: none;
	padding: 1rem;
	border-radius: 5px;

	&:hover {
		background-color: ${theme.colors.primary};
		color: white;
	}
`;

const ListItem:FC<Props> = ({ categoryName, url, onClick }) => {
	
	return(
		<Link href={url}><Item onClick={onClick}>{categoryName}</Item></Link>
	);
}

export default ListItem;
