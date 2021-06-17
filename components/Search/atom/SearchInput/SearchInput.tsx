import { FC, ChangeEvent } from "react";
import { FormControl } from 'react-bootstrap';
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  onChange:(event:ChangeEvent<HTMLInputElement>) => void;
  isOpen:boolean;
}

const DEFAULT_PLACEHOLDER = 'Recherchez un produit...';

const SearchInput:FC<Props> = ({ onChange, isOpen }) => {
  
  return (
    <AnimatePresence>
      {isOpen && (
        <FormControl
          type='search'
          as={motion.input}
          transition={{ duration: 0.25, type: 'tween' }}
          animate={{ width: '100%' }}
          initial={{ width: '0%'}}
          exit={{ width: '0%' }}
          onChange={onChange}
          placeholder={DEFAULT_PLACEHOLDER}
        />
      )}
    </AnimatePresence>
  );
}

export default SearchInput;
