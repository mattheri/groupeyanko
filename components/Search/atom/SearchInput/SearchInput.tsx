import { FC, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion"
import Input from "components/Input/molecule/Input";

interface Props {
  onChange:(event:ChangeEvent<HTMLInputElement>) => void;
  isOpen:boolean;
  value:string;
}

const DEFAULT_PLACEHOLDER = 'Recherchez un produit';

const SearchInput:FC<Props> = ({ onChange, isOpen, value }) => {
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Input
          type='search'
          error=''
          hasError={false}
          label={DEFAULT_PLACEHOLDER}
          touched={false}
          value={value}
          as={motion.input}
          transition={{ duration: 0.25, type: 'tween' }}
          animate={{ width: '100%' }}
          initial={{ width: '0%'}}
          exit={{ width: '0%' }}
          onChange={onChange}
          id='search'
        />
      )}
    </AnimatePresence>
  );
}

export default SearchInput;
