import { FC } from "react";
import { Button } from 'components/Button/Button';
import NavbarAuthenticationSection from "./NavbarAuthenticationSection";
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import theme from "theme/theme";

interface Props {
  isAuthenticated:boolean;
  onLogout:() => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media only screen and (${theme.mediaQueries.lg}) {
    flex-direction: row;
  }
`;

const NavbarInteractiveSection:FC<Props> = ({ isAuthenticated, onLogout }) => {

  return (
    <Container>
      <Nav.Link as={Button} block='xs' href="/" tertiary>Catalogue</Nav.Link>
      <NavbarAuthenticationSection isAuthenticated={isAuthenticated} onLogout={onLogout} />
    </Container>
  );
}

export default NavbarInteractiveSection;