import React, { useState, ChangeEvent, useContext } from "react";
import { FormikValues } from "types";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormUI from "../molecule/Form";
import Col from 'react-bootstrap/Col';
import { Button } from "components/Button/Button";
import { hasErrors } from "utils/hasErrors";
import Alert from 'react-bootstrap/Alert';
import { useRouter } from "next/router";
import { useAuth } from "components/Hooks/useAuth";

interface Props {
  cart:any;
  onQuoteSent:() => void;
}

const QUOTE_SENT_PATH = '/quotesent';

export function QuoteForm({ cart, onQuoteSent }:Props) {
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Envoyer la soumission");

  const { isAuthenticated, userInfo } = useAuth();
  const router = useRouter();

  const initialValues = isAuthenticated ? 
    { 
      ...userInfo,
      message: "",
    } : {
    firstname: "",
    lastname: "",
    email: "",
    company: "",
    phoneNumber: "",
    address: "",
    province: "Québec",
    city: "",
    postalCode: "",
    message: "",
  };

  const onSubmit = async (values: FormikValues<typeof initialValues>) => {
    try {
      // const email = await sendEmail(values, cart);

      setButtonText("Soumission envoyée");
      onQuoteSent();
      router.push(QUOTE_SENT_PATH);
    } catch (e) {
      console.log(e);
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit: onSubmit,
    validationSchema: Yup.object({
      firstname: Yup.string().required("Ce champs est requis"),
      lastname: Yup.string().required("Ce champs est requis"),
      email: Yup.string()
        .required("Ce champs est requis")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
          message: "Entrer une adresse valide.",
        }),
      company: Yup.string().notRequired(),
      phoneNumber: Yup.string()
        .required("Ce champs est requis")
        .matches(/^[\d{1,2}\s]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
          message: "Entrez un numéro de téléphone valide",
        }),
      address: Yup.string().required("Ce champs est requis"),
      province: Yup.string().notRequired(),
      city: Yup.string().required("Ce champs est requis"),
      postalCode: Yup.string()
        .required("Ce champs est requis")
        .matches(
          /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
          {
            message: "Entrer un code postal valide.",
          }
        ),
      message: Yup.string().notRequired(),
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

  const validate = hasErrors(formik.values, formik.errors, ['company', 'province', 'message']);

  return (
    <>
    {error && <Alert variant='danger'>{error}</Alert>}
    <FormUI formik={formik} onChange={handlePostalCodeChange}>
      <Col className="d-flex justify-content-center">
        <Button
          className="mt-4 w-100 w-lg-50"
          disabled={validate()}
          text={buttonText}
        />
      </Col>
    </FormUI>
    </>
  );
}
