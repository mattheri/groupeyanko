import { FC, useState, useEffect } from "react";
import useCategories from "../hook/useCategories";
import CategoriesPanelToggle from "../molecule/CategoriesPanelToggle";
import Panel from "../../SidePanel/organism/Panel";
import ParentItemList from "../molecule/ParentItemList";

const Categories:FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const categories = useCategories();

	const toggleCategoriesPanel = () => setIsOpen(!isOpen);

	useEffect(() => {
		document.querySelector('html').style.overflow = isOpen ? 'hidden' : 'auto';
	}, [isOpen]);

	return(
		<>
			<CategoriesPanelToggle onClick={toggleCategoriesPanel} isOpen={isOpen} />
			<Panel isOpen={isOpen} onClick={toggleCategoriesPanel}>
				{categories.map((filteredCategory) => (
					<ParentItemList onClick={toggleCategoriesPanel} key={filteredCategory.currentCategoryId} category={filteredCategory} />
				))}
			</Panel>
		</>
	);
}

export default Categories;
