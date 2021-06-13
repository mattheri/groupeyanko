import { InputUI } from "./InputUI";
import { FormControlProps } from "react-bootstrap/FormControl";
import { HTMLAttributes, FC } from "react";

type InputControllerProps = FormControlProps &
  Pick<HTMLAttributes<HTMLInputElement>, "onBlur"> & {
    formik: any;
    rows?:number;
  };

export const InputController: FC<InputControllerProps> = ({
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
    <InputUI
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
