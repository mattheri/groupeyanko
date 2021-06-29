import { useState, useEffect, useRef, ChangeEvent, FC } from "react";
import { useClickOutside } from "../../Hooks/useClickOutside";
import SearchContainer from "../atom/SearchContainer/SearchContainer";
import SearchInput from "../atom/SearchInput/SearchInput";
import MagnifyingGlass from "../atom/MagnifyingGlass/MagnifyingGlass";
import SearchResultsContainer from "../molecule/SearchResultContainer";
import useViewportY from "components/Hooks/useViewportY";
import useDebouncedValue from "../hook/useDebouncedValue";
import useSearchResults from "../hook/useSearchResult";

const SearchController:FC = () => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);

  const query = useDebouncedValue(value, 500);
  const results = useSearchResults(query);

  const changeSearchValue = (event:ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  const searchRef = useRef<HTMLDivElement>(null);
  const y = useViewportY();

  const handleOpen = () => !!(query && results.length) ? setOpen(true) : setOpen(false);
  
  const handleOpenWhenClickOutsie = () => {
    setValue("");
    setInputOpen(false);
    return setOpen(false);
  };

  useEffect(() => handleOpen(), [query, results.length]);

  useEffect(() => {
    if (y > 10) handleOpenWhenClickOutsie();
  }, [y]);

  useClickOutside(searchRef, handleOpenWhenClickOutsie);

  const openInput = () => setInputOpen(true);

  return (
    <SearchContainer ref={searchRef}>
      <SearchInput onChange={changeSearchValue} isOpen={inputOpen} value={value} />
      <MagnifyingGlass isInputOpen={inputOpen} onClick={openInput} />
      <SearchResultsContainer results={results} isOpen={open} onClick={handleOpenWhenClickOutsie} />
    </SearchContainer>
  );
}

export default SearchController;
