import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Category } from "../../../next-env";
import FilterUI from "../molecule/FilterUI";
import useFilterCategories from "../hook/UseFilterCategories";
import ApiService from "services/ApiService";
import { SearchController } from "components/Search/organism/SearchController";

export function Filter() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const handleOpen = () => setOpen(!open);
  const sortedCategories = useFilterCategories(categories);

  useEffect(() => {
    (async () => {
      if (!categories.length) {
        const response = await ApiService.fetch({
          url: '/api/categories',
          method: 'GET',
        });
        setCategories(response.data);
      }
    })();
  }, []);

  return (
    <>
      <SearchController onClick={handleOpen} toggle={open} />
      <AnimatePresence>
        {open && categories.length && <FilterUI categories={sortedCategories} />}
      </AnimatePresence>
    </>
  );
}
