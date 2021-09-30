import { FC } from "react";
import styled from "styled-components";
import { Navbar } from 'react-bootstrap';
import Image from 'next/image';
import logo from "public/uploads/images/logo-PROAXION.png";
import theme from "theme/theme";

const PROAXION_HOME = 'https://proaxion.ca/en/home/';
const ALT = 'Proaxion Logo';

const Container = styled.a`
  width: 50vw;
  max-width: 40rem;
  flex: 0 0 auto;

  @media only screen and (${theme.mediaQueries.lg}) {
    flex: 0 0 50vw;
    margin-right: 25%;
  }
`;

const Logo:FC = () => {

  return (
    <Navbar.Brand as={Container} href={PROAXION_HOME}>
      <Image
        src={logo}
        alt={ALT}
      />
    </Navbar.Brand>
  );
}

export default Logo;
