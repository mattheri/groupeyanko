import { Button } from "components/Button/Button";
import ErrorAlert from "components/ErrorAlert/atom/ErrorAlert";
import InputController from "components/Input/organism/InputController";
import SuccessAlert from "components/SuccessAlert/atom/SuccessAlert";
import { error } from "console";
import React, { FC, FormEvent } from "react";
import { Col, Form } from "react-bootstrap";

interface Props {
	formik:any;
	success:string;
	error:string;
	onSubmit:(event?:FormEvent<HTMLFormElement>) => void;
	validate:() => boolean;
}

const UpdatePasswordForm:FC<Props> = ({ formik, success, error, onSubmit, validate }) => {
	
	return(
		<>
			<SuccessAlert success={success} autoDismiss />
      <ErrorAlert error={error} />
      <Form onSubmit={onSubmit}>
      <Form.Row>
        <Col xs={12}>
          <Form.Group>
            <InputController
              label='Ancien mot de passe'
              required
              formik={formik}
              id="oldPassword"
              type="password"
            />
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group>
            <InputController
              label='Nouveau mot de passe'
              required
              formik={formik}
              id="newPassword"
              type="password"
            />
            <small>
              Le mot de passe doit contenir 8 caractères dont une lettre et un
              chiffre.
            </small>
          </Form.Group>
        </Col>
        <Col xs={12}>
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
        <Button
          className="mt-4 w-100 w-lg-50"
          disabled={validate()}
          text="Mettre mon mot de passe à jour"
        />
      </Form.Row>
      </Form>
		</>
	);
}

export default UpdatePasswordForm;
