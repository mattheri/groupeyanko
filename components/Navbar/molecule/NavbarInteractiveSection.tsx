import { FC, ForwardedRef, forwardRef } from "react";
import Button from 'components/Button/Button'
import NavbarAuthenticationSection from "./NavbarAuthenticationSection";
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import theme from "theme/theme";
import Categories from "components/Categories/organism/Categories";

interface Props {
  isAuthenticated:boolean;
  onLogout:() => void;
  ref:ForwardedRef<HTMLDivElement>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media only screen and (${theme.mediaQueries.lg}) {
    flex-direction: row;
    align-items: center;
    margin: auto 0;
  }
`;

const NavbarInteractiveSection:FC<Props> = forwardRef(({ isAuthenticated, onLogout }, ref) => {

  return (
    <Container ref={ref}>
      <Nav.Link as={Button} block='xs' href="/" tertiary>Accueil</Nav.Link>
      <Categories />
      <NavbarAuthenticationSection isAuthenticated={isAuthenticated} onLogout={onLogout} />
    </Container>
  );
});

export default NavbarInteractiveSection;