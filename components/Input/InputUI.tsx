import FormControl, { FormControlProps } from "react-bootstrap/FormControl";
import { HTMLAttributes } from "react";

type InputUIProps = FormControlProps &
  Pick<HTMLAttributes<HTMLInputElement>, "onBlur"> & {
    hasError: boolean;
    error: string;
    touched: boolean;
  };

export function InputUI({ hasError, error, touched, ...rest }: InputUIProps) {
  return (
    <>
      <FormControl {...rest} isInvalid={hasError} />
      <FormControl.Feedback type="invalid">
        {touched && error}
      </FormControl.Feedback>
    </>
  );
}
