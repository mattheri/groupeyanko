import { FC } from "react";
import { FilteredCategories } from "../hook/useFilteredCategories";
import ItemsList from "./ItemsList";

interface Props {
	category:FilteredCategories;
	onClick:() => void;
}

const ParentItemList:FC<Props> = ({ category, onClick }) => {
	return(
		<ItemsList onClick={onClick} categories={[category.category]}>
			<ItemsList onClick={onClick} categories={category.subCategories} />
		</ItemsList>
	);
}

export default ParentItemList;
