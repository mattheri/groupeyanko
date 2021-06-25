import { FC } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface Props {
  onClick:() => void;
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.473);
  z-index: 999;
`;

const SearchOverlay:FC<Props> = ({ onClick }) => {
  return <Overlay
    as={motion.div}
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />
}

export default SearchOverlay;
