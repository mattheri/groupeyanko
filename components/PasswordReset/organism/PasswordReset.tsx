import { Button } from 'components/Button/atom/Button';
import { FC } from 'react';
import { Container } from 'react-bootstrap';
import Form from '../molecule/Form';

interface Props {
  formik:any;
  validate:() => boolean;
}

const PasswordReset:FC<Props> = ({ formik, validate }) => {

  return (
    <Container className='py-5'>
      <Form formik={formik}>
        <Button type='submit' text="Réinitialiser mon mot de passe" disabled={validate()} />
      </Form>
    </Container>
  );
};

export default PasswordReset;
