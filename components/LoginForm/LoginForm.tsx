import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Button } from "../Button/Button";
import Col from "react-bootstrap/Col";
import { useAuth } from "../Hooks/useAuth";
import { useFormik } from "formik";
import InputController from "../Input/organism/InputController";
import * as Yup from "yup";
import { hasErrors } from "../../utils/hasErrors";
import ErrorAlert from "components/ErrorAlert/atom/ErrorAlert";

type LoginFormProps = {
  close?: () => void;
};

export function LoginForm({ close }: LoginFormProps) {
  const [loginError, setLoginError] = useState("");

  const { handleAuth } = useAuth();

  const onSubmit = async (values: { email: string; password: string }) => {
    await handleAuth(values, handleLoginError);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: onSubmit,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Ce champs est requis")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
          message: "Entrer une adresse valide.",
        }),
      password: Yup.string()
        .required("Ce champs est requis")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
          message:
            "Le mot de passe doit être au moins 8 charactères de long et contenir une lettre et un chiffre.",
        }),
    }),
  });

  const validate = hasErrors(formik.values, formik.errors);

  const handleLoginError = (e: string) => setLoginError(e);

  return (
    <Container className="pt-2 pr-2 pl-2">
      <ErrorAlert error={loginError} />
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group>
          <InputController label='Email' required formik={formik} type="email" id="email" />
        </Form.Group>
        <Form.Group>
          <InputController label='Mot de passe' required formik={formik} type="password" id="password" />
        </Form.Group>
        <Form.Row>
          <Col className="d-flex justify-content-center">
            <Button className="w-50" disabled={validate()} text="Connexion" />
          </Col>
        </Form.Row>
      </Form>
      <Row>
        <Col className="d-flex justify-content-center align-items-center pt-3">
          <Button
            className="text-dark"
            href="/forgotpassword"
            tertiary
            onClick={() => close()}
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
            onClick={() => close()}
            href="/signup"
            text="Créer un compte"
          />
        </Col>
      </Row>
    </Container>
  );
}
