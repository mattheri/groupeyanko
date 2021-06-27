import { Category } from "next-env";
import { FC } from "react";
import List from "../atom/List";
import ListItem from "./ListItem";

interface Props {
	categories:Category[];
	onClick:() => void;
}

const DEFAULT_CATEGORY_URL = '/category/';

const ItemsList:FC<Props> = ({ categories, onClick, children }) => {
	
	return(
		<List>
			{categories.map((category) => (
				<ListItem
					key={category.id}
					url={`${DEFAULT_CATEGORY_URL}${category.id}`}
					categoryName={category.name}
					onClick={onClick}
				/>
			))}
			{children}
		</List>
	);
}

export default ItemsList;
