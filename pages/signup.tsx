import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "../components/Button/Button";
import { useAuth } from "../components/Hooks/useAuth";
import { SignupForm } from "../components/SignupForm/SignupForm";
import { FormData } from "../next-env";
import Alert from "react-bootstrap/Alert";
import { useBreadcrumbs } from "../components/Hooks/useBreadcrumbs";

export default function Signup() {
  const [formData, setFormData] = React.useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    reType: "",
    company: "",
    phoneNumber: "",
    address: "",
    province: "Québec",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = React.useState<FormData>();

  const hasErrors = () => {
    if (
      Object.entries(formData)
        .filter(([key, value]) => key !== "company")
        .every(([key, value]) => value.length > 0) &&
      Object.entries(errors)
        .filter(([key, value]) => key !== "province")
        .every(([key, value]) => value.length === 0)
    ) {
      return false;
    }

    return true;
  };
  const { setNavigationState } = useBreadcrumbs();

  React.useEffect(() => {
    setNavigationState(["Créer un compte", "/signup"]);
  }, []);
  const { handleAuth, handleSignUp } = useAuth();
  const [loginError, setLoginError] = React.useState("");

  return (
    <Container className="p-2 pt-5">
      {loginError.length > 0 && <Alert variant="danger">{loginError}</Alert>}
      <SignupForm
        returnErrors={setErrors}
        formData={formData}
        setFormData={setFormData}
      />
      <Row>
        <Col className="d-flex justify-content-center">
          <Button
            className="mt-4 w-100 w-lg-50"
            disabled={hasErrors()}
            onClick={() => handleSignUp(formData, setLoginError)}
            text="Créer mon compte"
          />
        </Col>
      </Row>
    </Container>
  );
}
