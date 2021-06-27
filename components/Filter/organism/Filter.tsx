import { useEffect, useState, useContext } from "react";
import { Category } from "types";
import FilterUI from "../molecule/FilterUI";
import useFilterCategories from "../hook/UseFilterCategories";
import ApiService from "services/ApiService";
import { ApiResponse } from "services/domain/Api";

export function Filter() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const handleOpen = () => setOpen(!open);
  const sortedCategories = useFilterCategories(categories);

  useEffect(() => {
    (async () => {
      if (!categories.length) {
        const response:ApiResponse<Category[]> = await ApiService.get({
          url: '/api/categories',
        });
        setCategories(response.data);
      }
    })();
  }, []);

  return (
    <>
      {categories.length && <FilterUI categories={sortedCategories} isOpen={open} />}
    </>
  );
}
