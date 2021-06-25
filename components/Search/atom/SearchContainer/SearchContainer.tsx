import { forwardRef, ForwardedRef, ReactNode, CSSProperties } from "react";
import { motion } from 'framer-motion';
import styled from 'styled-components';
import theme from 'theme/theme';

interface Props {
  children:ReactNode;
  style?:CSSProperties;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchContainer = forwardRef(({ style, children }:Props, ref:ForwardedRef<HTMLDivElement>) => {

  return (
    <Container as={motion.div} style={style} ref={ref}>
      {children}
    </Container>
  );
});

export default SearchContainer;
