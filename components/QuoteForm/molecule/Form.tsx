import { FC, ChangeEvent } from "react";
import { InputController } from "../../Input/InputController";
import Form from "react-bootstrap/Form";
import InformationForm from "components/InformationForm/InformationForm";
interface Props {
  formik: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormUI: FC<Props> = ({ formik, onChange, children }) => {
  return (
    <Form onSubmit={formik.handleSubmit} noValidate>
      <InformationForm formik={formik} onChange={onChange} />
      <Form.Row>
        <Form.Label>
          Message (optionnel)
        </Form.Label>
        <InputController
          formik={formik}
          id="message"
          as="textarea"
          rows={9}
        />
      </Form.Row>
      <Form.Row>
        {children}
      </Form.Row>
    </Form>
  );
};

export default FormUI;
