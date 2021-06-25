import { FC } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

interface Props {
  isInputOpen:boolean;
  onClick:() => void;
}

const Container = styled.div`
  width: fit-content;
  margin-left: auto;
  
  button {
    padding: 0;
    color: black;
  }
  
  svg {
    width: auto;
    height: 2rem;
  }
`;

const MagnifyingGlass:FC<Props> = ({ isInputOpen, onClick }) => {
  
  return (
    <AnimatePresence>
      {!isInputOpen && (
        <Container>
          <Button
            onClick={onClick}
            variant='link'
            as={motion.button}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: -10 }}
            exit={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, type: 'tween' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </Button>
        </Container>
      )}
    </AnimatePresence>
  );
}

export default MagnifyingGlass;
