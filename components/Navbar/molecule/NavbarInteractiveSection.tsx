import { FC } from "react";
import { Button } from 'components/Button/Button';
import NavbarAuthenticationSection from "./NavbarAuthenticationSection";
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import theme from "theme/theme";
import Categories from "components/Categories/organism/Categories";

interface Props {
  isAuthenticated:boolean;
  onLogout:() => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  height: 100%;

  @media only screen and (${theme.mediaQueries.lg}) {
    flex-direction: row;
  }
`;

const NavbarInteractiveSection:FC<Props> = ({ isAuthenticated, onLogout }) => {

  return (
    <Container>
      <Nav.Link as={Button} block='xs' href="/" tertiary>Accueil</Nav.Link>
      <Categories />
      <NavbarAuthenticationSection isAuthenticated={isAuthenticated} onLogout={onLogout} />
    </Container>
  );
}

export default NavbarInteractiveSection;