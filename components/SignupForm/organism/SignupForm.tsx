import React, { useState, ChangeEvent } from "react";
import { FormData, FormikValues } from "types";
import { useAuth } from "../../Hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormUI from "../molecule/Form";
import Col from 'react-bootstrap/Col';
import { Button } from "../../Button/Button";
import { hasErrors } from "../../../utils/hasErrors";
import Alert from 'react-bootstrap/Alert';
import regex from "utils/regex";

export function SignupForm() {
  const [error, setError] = useState("");
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    reType: "",
    company: "",
    phoneNumber: "",
    address: "",
    province: "Québec",
    city: "",
    postalCode: "",
  };

  const { handleSignUp } = useAuth();
  const returnSignupError = (e: string) => setError(e);
  const onSubmit = (values: FormikValues<typeof initialValues>) =>
    handleSignUp(values, returnSignupError);

  const formik = useFormik({
    initialValues,
    onSubmit: onSubmit,
    validationSchema: Yup.object({
      firstname: Yup.string().required("Ce champs est requis"),
      lastname: Yup.string().required("Ce champs est requis"),
      email: Yup.string()
        .required("Ce champs est requis")
        .matches(regex.email, {
          message: "Entrer une adresse valide.",
        }),
      password: Yup.string()
        .required("Ce champs est requis")
        .matches(regex.password, {
          message:
            "Le mot de passe doit être au moins 8 charactères de long et contenir une lettre et un chiffre.",
        }),
      reType: Yup.string()
        .required("Ce champs est requis")
        .oneOf(
          [Yup.ref("password"), null],
          "Ce champs doit être identique au mot de passe"
        ),
      company: Yup.string().notRequired(),
      phoneNumber: Yup.string()
        .required("Ce champs est requis")
        .matches(regex.phoneNumber, {
          message: "Entrez un numéro de téléphone valide",
        }),
      address: Yup.string().required("Ce champs est requis"),
      provice: Yup.string().notRequired(),
      city: Yup.string().required("Ce champs est requis"),
      postalCode: Yup.string()
        .required("Ce champs est requis")
        .matches(
          regex.postalCode,
          {
            message: "Entrer un code postal valide.",
          }
        ),
    }),
  });

  const formatPostalCode = (value: string) => {
    if (value.includes(" ")) return value.toUpperCase();
    return value
      .toUpperCase()
      .replace(/(\w{3})/, "$1 ")
      .replace(/(^\s+|\s+$)/, "");
  };

  const handlePostalCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
    formik.setFieldValue("postalCode", formatPostalCode(event.target.value));
  };

  const validate = hasErrors(formik.values, formik.errors, ['company', 'province']);

  return (
    <>
    {error && <Alert variant='danger'>{error}</Alert>}
    <FormUI formik={formik} onChange={handlePostalCodeChange}>
      <Col className="d-flex justify-content-center">
        <Button
          className="mt-4 w-100 w-lg-50"
          disabled={validate()}
          text="Créer mon compte"
        />
      </Col>
    </FormUI>
    </>
  );
}
