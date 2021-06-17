import { useEffect, useState, useContext } from "react";
import { Category } from "../../../next-env";
import FilterUI from "../molecule/FilterUI";
import useFilterCategories from "../hook/UseFilterCategories";
import ApiService from "services/ApiService";
import { AnimationContext } from "components/Context/AnimationContext";

export function Filter() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const handleOpen = () => setOpen(!open);
  const sortedCategories = useFilterCategories(categories);
  const { setPresence } = useContext(AnimationContext);

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

  useEffect(() => {
    setPresence({ isPresent:open ? true : false });
  }, [open]);

  return (
    <>
      {categories.length && <FilterUI categories={sortedCategories} isOpen={open} />}
    </>
  );
}
