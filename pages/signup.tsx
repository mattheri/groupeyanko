import React from "react";
import Container from "react-bootstrap/Container";
import { SignupForm } from "../components/SignupForm/organism/SignupForm";

export default function Signup() {
  return (
    <Container className="p-2 pt-5">
      <SignupForm />
    </Container>
  );
}
