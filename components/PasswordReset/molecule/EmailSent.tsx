import { Container } from 'react-bootstrap';
import { FC } from 'react';

interface Props {
  email:string;
}

const EmailSent:FC<Props> = ({ email }) => {

  return (
    <Container className='py-5'>
      <h1>Un courriel a été envoyé à {email}</h1>
    </Container>
  );
};

export default EmailSent;
