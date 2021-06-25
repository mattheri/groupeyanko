import { useState, FC } from "react";
import { useAuth } from "../Hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { hasErrors } from "../../utils/hasErrors";
import { LoginFormUI } from "./LoginFormUI";
import { FormikValues } from "../../next-env";
import regex from "utils/regex";

interface Props {
  close?:() => void;
};

const LoginFormController:FC<Props> = ({ close }) => {
  const [loginError, setLoginError] = useState("");

  const { handleAuth } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values: FormikValues<typeof initialValues>) => {
    handleAuth(
      { email: values.email, password: values.password },
      handleLoginError
    );
  };

  const formik = useFormik({
    initialValues,
    onSubmit: onSubmit,
    validationSchema: Yup.object({
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
    }),
  });

  const validate = hasErrors(formik.values, formik.errors);

  const handleLoginError = (e: string) => setLoginError(e);

  const closeModal = () => close();

  return (
    <LoginFormUI
      close={closeModal}
      formik={formik}
      error={loginError}
      onSubmit={formik.handleSubmit}
      onValidate={validate}
    />
  );
}

export default LoginFormController;
