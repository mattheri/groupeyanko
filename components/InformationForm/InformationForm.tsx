import { FC, ChangeEvent } from "react";
import { InputController } from "components/Input/InputController";
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
            <Form.Label>Prénom *</Form.Label>
            <InputController formik={formik} id="firstname" type="text" />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Nom *</Form.Label>
            <InputController formik={formik} id="lastname" type="text" />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Group>
        <Form.Label>Courriel *</Form.Label>
        <InputController formik={formik} id="email" type="email" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Compagnie</Form.Label>
        <InputController formik={formik} id="company" type="text" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Téléphone *</Form.Label>
        <InputController formik={formik} id="phoneNumber" type="text" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Adresse *</Form.Label>
        <InputController formik={formik} id="address" type="text" />
      </Form.Group>
      <Form.Row>
        <Col xs={12} md={6} lg={4}>
          <Form.Group>
            <ProvinceSelect formik={formik} id="province" label="Province" />
          </Form.Group>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Form.Group>
            <Form.Label>Ville *</Form.Label>
            <InputController formik={formik} id="city" type="text" />
          </Form.Group>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Form.Group>
            <Form.Label>Code Postal *</Form.Label>
            <InputController
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
