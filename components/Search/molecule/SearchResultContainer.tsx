import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Result, { ResultProps } from "../atom/Result/Result";
import { Product } from "types";
import SearchOverlay from "../atom/Overlay/SearchOverlay";
import styled from 'styled-components';

interface Props {
  results:Product[];
  isOpen:boolean;
  onClick:() => void;
}

const DEFAULT_PLACEHOLDER_IMAGE = "/uploads/images/placeholder.png";

const Container = styled.section`
  position: absolute;
  display: grid;
  top: 5rem;
  z-index: 1000;
  background-color: white;
  width: 100%;
  padding: 1rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  max-height: 40rem;
  overflow-y: auto;
`;

const SearchResultsContainer:FC<Props> = ({ results, isOpen, onClick }) => {
  
  return(
    <AnimatePresence>
      {isOpen && (
        <>
          <Container
            as={motion.section}
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
          </Container>
          <SearchOverlay onClick={onClick} />
        </>
      )}
    </AnimatePresence>
  );
}

export default SearchResultsContainer;
