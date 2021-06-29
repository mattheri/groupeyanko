import { FC, ChangeEvent } from "react";
import InputController from "components/Input/organism/InputController";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ProvinceSelect from "./ProvinceSelect";
interface Props {
  formik: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InformationForm: FC<Props> = ({ formik, onChange }) => {
  return (
    <>
      <Form.Row>
        <Col xs={12} md={6}>
          <Form.Group>
            <InputController required label='Prénom' formik={formik} id="firstname" type="text" />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <InputController label='Nom' required formik={formik} id="lastname" type="text" />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Group>
        <InputController label='Courriel' required formik={formik} id="email" type="email" />
      </Form.Group>
      <Form.Group>
        <InputController label='Compagnie' formik={formik} id="company" type="text" />
      </Form.Group>
      <Form.Group>
        <InputController label='Téléphone' required formik={formik} id="phoneNumber" type="text" />
      </Form.Group>
      <Form.Group>
        <InputController label='Adresse' required formik={formik} id="address" type="text" />
      </Form.Group>
      <Form.Row>
        <Col xs={12} md={6} lg={4}>
          <Form.Group>
            <ProvinceSelect formik={formik} id="province" label="Province" />
          </Form.Group>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Form.Group>
            <InputController label='Ville' required formik={formik} id="city" type="text" />
          </Form.Group>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Form.Group>
            <InputController
              label='Code Postal'
              required
              formik={formik}
              id="postalCode"
              type="text"
              onChange={onChange}
            />
          </Form.Group>
        </Col>
      </Form.Row>
    </>
  );
};

export default InformationForm;
