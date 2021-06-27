import { FC } from "react";
import Close from "../atom/Close";
import Container from "../atom/Container";
import { FilteredCategories } from "../hook/useFilteredCategories";
import ParentItemList from "./ParentItemList";

interface Props {
	categories:FilteredCategories[];
	onClick:() => void;
	isOpen:boolean;
}

const Panel:FC<Props> = ({ categories, isOpen, onClick }) => {
	
	return(
		<Container isOpen={isOpen}>
			<Close onClick={onClick} />
			{categories.map((filteredCategory) => (
				<ParentItemList onClick={onClick} key={filteredCategory.currentCategoryId} category={filteredCategory} />
			))}
		</Container>
	);
}

export default Panel;
