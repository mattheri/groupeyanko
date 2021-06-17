import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Result, { ResultProps } from "../atom/Result/Result";
import { Product } from "next-env";
import styles from './container.module.scss';
import SearchOverlay from "../atom/Overlay/SearchOverlay";

interface Props {
  results:Product[];
  isOpen:boolean;
  onClick:() => void;
}

const DEFAULT_PLACEHOLDER_IMAGE = "/uploads/images/placeholder.png";

const SearchResultsContainer:FC<Props> = ({ results, isOpen, onClick }) => {
  
  return(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.section
            className={styles.searchResults}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ type: "just" }}
          >
            {results.map(({ id, name, alt, images }) => (
              <Result
                key={id}
                onClick={onClick}
                id={`${id}`}
                name={name}
                src={images.length ? images[0].src : DEFAULT_PLACEHOLDER_IMAGE}
                alt={alt}
              />
            ))}
          </motion.section>
          <SearchOverlay onClick={onClick} />
        </>
      )}
    </AnimatePresence>
  );
}

export default SearchResultsContainer;
