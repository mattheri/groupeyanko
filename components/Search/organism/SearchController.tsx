import { useState, useEffect, useRef, ChangeEvent, FC, CSSProperties } from "react";
import { Product } from "../../../next-env";
import { useClickOutside } from "../../Hooks/useClickOutside";
import ApiService from "services/ApiService";
import SearchContainer from "../atom/SearchContainer/SearchContainer";
import SearchInput from "../atom/SearchInput/SearchInput";
import MagnifyingGlass from "../atom/MagnifyingGlass/MagnifyingGlass";
import SearchResultsContainer from "../molecule/SearchResultContainer";
import useViewportY from "components/Hooks/useViewportY";

interface Props {
  style?:CSSProperties;
}

const SearchController:FC<Props> = ({ style }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  let timer: any;
  let totalArgs = [];

  const debounce = (func: any, time: number, args: any) => {
    totalArgs = [...args];

    return () => {
      while (!timer) {
        timer = setTimeout(() => {
          func(totalArgs.join(""));
          timer = false;
        }, time);
      }
    };
  };
  const debounced = (val: string) => debounce(setQuery, 500, val)();

  const handleChange = (change: ChangeEvent<HTMLInputElement>) =>
    debounced(change.target.value);

  useEffect(() => {
    if (query) {
      (async () => {
        try {
          const response = await ApiService.fetch({
            url: '/api/search',
            method: 'POST',
            data: {
              query,
            }
          });
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
          setResults(response.data);
        } catch (e) {
          setResults([]);
        }
      })();
    }
  }, [query]);

  const searchRef = useRef<HTMLDivElement>(null);
  const y = useViewportY();

  const handleOpen = () =>
    !!(query && results.length) ? setOpen(true) : setOpen(false);
  const handleOpenWhenClickOutsie = () => {
    setQuery("");
    setResults([]);
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
      <SearchInput onChange={handleChange} isOpen={inputOpen} />
      <MagnifyingGlass isInputOpen={inputOpen} onClick={openInput} />
      <SearchResultsContainer results={results} isOpen={open} onClick={handleOpenWhenClickOutsie} />
    </SearchContainer>
  );
}

export default SearchController;
