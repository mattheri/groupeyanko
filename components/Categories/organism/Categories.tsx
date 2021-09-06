import { FC, useState } from "react";
import useCategories from "../hook/useCategories";
import CategoriesPanelToggle from "../molecule/CategoriesPanelToggle";
import Panel from "components/SidePanel/organism/Panel";
import ParentItemList from "../molecule/ParentItemList";

const Categories:FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const categories = useCategories();

	const toggleCategoriesPanel = () => setIsOpen(!isOpen);
	const closeSidePanel = () => setIsOpen(false);

	return(
		<>
			<CategoriesPanelToggle onClick={toggleCategoriesPanel} isOpen={isOpen} />
			<Panel isOpen={isOpen} onClick={toggleCategoriesPanel} onClose={closeSidePanel}>
				{categories.map((filteredCategory) => (
					<ParentItemList onClick={toggleCategoriesPanel} key={filteredCategory.currentCategoryId} category={filteredCategory} />
				))}
			</Panel>
		</>
	);
}

export default Categories;
