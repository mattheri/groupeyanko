import React, { FC, useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AxiosResponse } from 'axios';
import { QuerySuccessMessage } from 'services/domain/Database';
import ApiService from 'services/ApiService';
import SuccessAlert from 'components/SuccessAlert/atom/SuccessAlert';
import ErrorAlert from 'components/ErrorAlert/atom/ErrorAlert';
import { hasErrors } from 'utils/hasErrors';
import { InputController } from 'components/Input/InputController';
import { Button } from 'components/Button/Button';
import regex from 'utils/regex';

interface Props {
  userEmail:string;
}

const UpdatePassword:FC<Props> = ({ userEmail }) => {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    reType: '',
  }

  const onSubmit = async (values:typeof initialValues) => {
    try {
      const response:AxiosResponse<QuerySuccessMessage> = await ApiService.post({
        url: '/api/updatePassword',
        data: {
          email: userEmail,
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        }
      });
      if (response.status === 200) {
        setSuccess(response.data.message);
      }
    } catch (e) {
      setError(e);
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: Yup.object({
      oldPassword: Yup.string()
      .required("Ce champs est requis")
      .matches(regex.password, {
        message:
          "Le mot de passe doit être au moins 8 charactères de long et contenir une lettre et un chiffre.",
      }),
      newPassword: Yup.string()
        .required("Ce champs est requis")
        .matches(regex.password, {
          message:
            "Le mot de passe doit être au moins 8 charactères de long et contenir une lettre et un chiffre.",
        }),
      reType: Yup.string()
        .required("Ce champs est requis")
        .oneOf(
          [Yup.ref("newPassword"), null],
          "Ce champs doit être identique au mot de passe"
        ),
    })
  });

  const validate = hasErrors(formik.values, formik.errors);

  return(
    <>
      <SuccessAlert success={success} autoDismiss />
      <ErrorAlert error={error} />
      <Form onSubmit={formik.handleSubmit}>
      <Form.Row>
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Ancien mot de passe *</Form.Label>
            <InputController formik={formik} id="oldPassword" type="password" />
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Nouveau mot de passe *</Form.Label>
            <InputController formik={formik} id="newPassword" type="password" />
            <small>
              Le mot de passe doit contenir 8 caractères dont une lettre et un
              chiffre.
            </small>
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Entrez de nouveau le mot de passe *</Form.Label>
            <InputController formik={formik} id="reType" type="password" />
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

export default UpdatePassword;
