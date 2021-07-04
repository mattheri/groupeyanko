import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from 'components/Button/Button'
import Col from "react-bootstrap/Col";
import InputController from "components/Input/organism/InputController";
import ErrorAlert from "components/ErrorAlert/atom/ErrorAlert";

type LoginFormProps = {
  close: () => void;
  error:string;
  onSubmit: () => void;
  formik: any;
  onValidate: () => boolean;
};

export function LoginFormUI({
  close,
  error,
  onSubmit,
  formik,
  onValidate,
}: LoginFormProps) {
  return (
    <Container className="pt-2 pr-2 pl-2">
      <ErrorAlert error={error} autoDismiss />
      <Form noValidate onSubmit={onSubmit}>
        <Form.Group>
          <InputController
            label='Email'
            required
            formik={formik}
            type="email"
            id="email"
          />
        </Form.Group>
        <Form.Group>
          <InputController
            label='Mot de passe'
            required
            formik={formik}
            type="password"
            id="password"
          />
        </Form.Group>
        <Form.Row>
          <Col className="d-flex justify-content-center">
            <Button className="w-50" disabled={onValidate()} text="Connexion" />
          </Col>
        </Form.Row>
      </Form>
      <Row>
        <Col className="d-flex justify-content-center align-items-center pt-3">
          <Button
            className="text-dark"
            href="/forgotpassword"
            tertiary
            onClick={close}
            text="Vous avez oublié votre mot de passe?"
          />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center align-items-center pt-5">
          <small>Vous n'avez pas de compte?</small>
          <Button
            className="ml-2"
            size="sm"
            onClick={close}
            href="/signup"
            text="Créer un compte"
          />
        </Col>
      </Row>
    </Container>
  );
}
