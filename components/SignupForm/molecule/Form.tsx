import { FC, ChangeEvent } from "react";
import InputController from "../../Input/organism/InputController";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InformationForm from "components/InformationForm/InformationForm";
interface Props {
  formik: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormUI: FC<Props> = ({ formik, onChange, children }) => {
  return (
    <Form onSubmit={formik.handleSubmit} noValidate>
      <InformationForm formik={formik} onChange={onChange} />
      <Form.Row>
        <Col xs={12} md={6}>
          <Form.Group>
            <InputController
              label='Mot de passe'
              required
              formik={formik}
              id="password"
              type="password"
            />
            <small>
              Le mot de passe doit contenir 8 caractères dont une lettre et un
              chiffre.
            </small>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <InputController
              label='Entrez de nouveau le mot de passe'
              required
              formik={formik}
              id="reType"
              type="password"
            />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        {children}
      </Form.Row>
    </Form>
  );
};

export default FormUI;
