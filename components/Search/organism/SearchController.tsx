import axios from "axios";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { Product } from "../../../next-env";
import { Button } from "../../Button/atom/Button";
import styles from "./search.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";
import { useClickOutside } from "../../Hooks/useClickOutside";
import ApiService from "services/ApiService";

type SearchProps = {
  onClick: () => void;
  toggle: boolean;
};

export function SearchController({ onClick, toggle }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
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
  const debounced = (val: string) => debounce(setQuery, 1000, val)();

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

  const handleOpen = () =>
    !!(query && results.length) ? setOpen(true) : setOpen(false);
  const handleOpenWhenClickOutsie = (v: boolean) => {
    setQuery("");
    setResults([]);
    return setOpen(v);
  };

  useEffect(() => handleOpen(), [query, results.length]);

  useClickOutside(searchRef, handleOpenWhenClickOutsie);

  return (
    <div ref={searchRef} className={styles.filterBtn}>
      <InputGroup className={styles.filter}>
        <FormControl className="my-2" type="search" onChange={handleChange} />
        <InputGroup.Append>
          <Button className={styles.btn} onClick={() => onClick()}>
            {toggle ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-filter"
                viewBox="0 0 16 16"
              >
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            )}
          </Button>
        </InputGroup.Append>
        {open && (
          <motion.section layout className={styles.results}>
            {results.map((result) => (
              <Link href={`/product/${result.id}`}>
                <motion.a
                  onClick={() => handleOpenWhenClickOutsie(false)}
                  className={styles.articleLink}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <img
                    src={
                      result.images.length
                        ? result.images[0].src
                        : "/uploads/images/placeholder.png"
                    }
                    alt={result.name}
                    width={50}
                    height={50}
                  />
                  <p>{`${result.name}`}</p>
                </motion.a>
              </Link>
            ))}
          </motion.section>
        )}
      </InputGroup>
    </div>
  );
}
