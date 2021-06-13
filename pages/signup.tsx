import React from "react";
import Container from "react-bootstrap/Container";
import { SignupForm } from "../components/SignupForm/organism/SignupForm";
import { useBreadcrumbs } from "../components/Hooks/useBreadcrumbs";

export default function Signup() {
  const { setNavigationState } = useBreadcrumbs();

  React.useEffect(() => {
    setNavigationState(["Créer un compte", "/signup"]);
  }, []);

  return (
    <Container className="p-2 pt-5">
      <SignupForm />
    </Container>
  );
}
