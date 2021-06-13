import React from "react";
import { useRouter } from "next/router";
import { useBreadcrumbs } from "../components/Hooks/useBreadcrumbs";
import ApiService from "services/ApiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormikValues } from "next-env";
import { hasErrors } from "utils/hasErrors";
import EmailSent from "components/PasswordReset/molecule/EmailSent";
import PasswordReset from "components/PasswordReset/organism/PasswordReset";

export default function ForgotPassword() {
  const { setNavigationState } = useBreadcrumbs();

  React.useEffect(
    () =>
      setNavigationState([
        "Réinitialisation de mot de passe",
        "/forgotpassword",
      ]),
    []
  );

  const initialValues = {
    email: '',
  };

  const [emailSent, setEmailSent] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (values:FormikValues<typeof initialValues>) => {
    const response = await ApiService.fetch({
      url: '/api/resetPassword',
      method: 'POST',
      data: {
        email: values.email,
      }
    });

    if (response.status === 200) {
      setEmailSent(true);
  
      setTimeout(() => {
        router.push("/");
      }, 10000);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: Yup.object({
      email: Yup.string().required('Entrez une adresse valide.').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: 'Entrez une adresse valide.'
      })
    })
  });

  const validate = hasErrors(formik.values, formik.errors);

  return emailSent ? <EmailSent email={formik.values.email} /> : <PasswordReset formik={formik} validate={validate} />;
}
