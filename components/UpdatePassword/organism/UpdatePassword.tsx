import React, { FC, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AxiosResponse } from 'axios';
import { QuerySuccessMessage } from 'services/domain/Database';
import ApiService from 'services/ApiService';
import { hasErrors } from 'utils/hasErrors';
import regex from 'utils/regex';
import UpdatePasswordForm from '../molecule/UpdatePasswordForm';

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

  return <UpdatePasswordForm
    error={error}
    formik={formik} onSubmit={formik.handleSubmit}
    success={success}
    validate={validate}
    />
}

export default UpdatePassword;
