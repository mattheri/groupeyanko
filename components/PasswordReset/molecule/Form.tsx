import { InputController } from 'components/Input/InputController';
import { FC } from 'react';
import { Form as BootstrapForm, Col } from 'react-bootstrap';

interface Props {
  formik:any;
}

const Form:FC<Props> = ({ formik, children }) => {

  return (
    <BootstrapForm onSubmit={formik.handleSubmit}>
      <BootstrapForm.Row>
        <Col>
          <BootstrapForm.Group>
            <BootstrapForm.Label>Email *</BootstrapForm.Label>
            <InputController formik={formik} id='email' />
          </BootstrapForm.Group>
        </Col>
      </BootstrapForm.Row>
      <BootstrapForm.Row>
        <Col>
          {children}
        </Col>
      </BootstrapForm.Row>
    </BootstrapForm>
  );
};

export default Form;
