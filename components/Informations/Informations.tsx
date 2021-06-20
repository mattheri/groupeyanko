import InformationForm from 'components/InformationForm/InformationForm';
import { FC, ChangeEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { FormikValues } from 'next-env';
import * as Yup from 'yup';
import { hasErrors } from 'utils/hasErrors';
import { BasicUserInformation, UserInformation } from 'services/domain/User';
import ApiService from 'services/ApiService';
import { AxiosResponse } from 'axios';
import { Button } from 'components/Button/Button';
import ErrorAlert from 'components/ErrorAlert/atom/ErrorAlert';
import SuccessAlert from 'components/SuccessAlert/atom/SuccessAlert';

interface Props {
  user:Omit<UserInformation, 'wooId' | 'id' | 'connected'>;
  userId:string;
  onUpdate:(userInformations:BasicUserInformation) => void;
}

const ALERT_FADE_DELAY = 3000;

const Informations:FC<Props> = ({ user, userId, onUpdate }) => {
  const [updateSuccessful, setUpdateSuccessful] = useState('');
  const [error, setError] = useState('');

  const initialValues = user;

  const onSubmit = async (values: FormikValues<typeof initialValues>) => {
    try {
      const data:AxiosResponse<UserInformation> = await ApiService.post({
        url: '/api/updateUser',
        data: {
          id: userId,
          informations: values,
        }
      });

      if (data.status === 200) {
        onUpdate(values);
        setUpdateSuccessful('Informations mises à jour');

        setTimeout(() => {
          setUpdateSuccessful('');
        }, ALERT_FADE_DELAY);
      };
    } catch (e) {
      setError(e);
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
        )
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

  return(
    <>
      <ErrorAlert error={error} />
      <SuccessAlert success={updateSuccessful} />
      <Form onSubmit={formik.handleSubmit}>
        <InformationForm formik={formik} onChange={handlePostalCodeChange} />
        <Button disabled={validate()} className='mt-4 w-100 w-lg-50' text='Mettre à jour' />
      </Form>
    </>
  );
}

export default Informations;
