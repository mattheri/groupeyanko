import { FC } from "react";
import styled from "styled-components";
import { Navbar } from 'react-bootstrap';

const PROAXION_HOME = 'https://proaxion.ca/en/home/';
const LOGO_PATH = '/uploads/images/logo-PROAXION.png';
const LOGO_DIMENSIONS = {
  width:789,
  height:170,
};
const ALT = 'Proaxion Logo';

const Container = styled.a`
  width: 50vw;
  max-width: 40rem;
  grid-column: 1;
  grid-row: 1;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Logo:FC = () => {

  return (
    <Navbar.Brand as={Container} href={PROAXION_HOME}>
      <Image
        src={LOGO_PATH}
        width={LOGO_DIMENSIONS.width}
        height={LOGO_DIMENSIONS.height}
        alt={ALT}
      />
    </Navbar.Brand>
  );
}

export default Logo;
