import Input from "../molecule/Input";
import { FC, InputHTMLAttributes } from "react";

type InputControllerProps = InputHTMLAttributes<HTMLInputElement> & {
    formik: any;
    rows?:number;
    label:string;
    as?:any;
  };

const InputController: FC<InputControllerProps> = ({
  formik,
  id,
  onChange,
  ...rest
}) => {
  const formikValue = (field: string) => {
    const value: { [key: string]: any } = {
      errors: formik[field] ? formik[field][id] : "",
      values: formik[field] ? formik[field][id] : "",
      touched: formik[field] ? formik[field][id] : false,
    };

    return value[field];
  };
  const short = {
    e: "errors",
    v: "values",
    t: "touched",
  };

  return (
    <Input
      {...rest}
      id={id}
      error={formikValue(short.e)}
      hasError={formikValue(short.t) && !!formikValue(short.e)}
      touched={formikValue(short.t)}
      value={formikValue(short.v)}
      onChange={onChange || formik.handleChange}
      onBlur={formik.handleBlur}
      type={rest.type}
      as={rest.as}
    />
  );
};

export default InputController;
