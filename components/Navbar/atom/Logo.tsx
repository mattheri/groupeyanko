import { FC } from "react";
import styled from "styled-components";
import { Navbar } from 'react-bootstrap';
import Image from 'next/image';
import logo from "public/uploads/images/logo-PROAXION.png";

const PROAXION_HOME = 'https://proaxion.ca/en/home/';
const ALT = 'Proaxion Logo';

const Container = styled.a`
  width: 50vw;
  max-width: 40rem;
  grid-column: 1;
  grid-row: 1;
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
