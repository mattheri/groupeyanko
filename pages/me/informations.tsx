import useProtectedRoute from "components/Hooks/useProtectedRoute";
import BasicInformations from "components/Informations/BasicInformations";
import ProfileLayout from "components/ProfileLayout/organism/ProfileLayout";
import { ReactNode } from "react";

export default function Informations() {
  useProtectedRoute();

  return <BasicInformations />;
}

Informations.getLayout = function getLayout(page:ReactNode) {

  return(
    <ProfileLayout>
      {page}
    </ProfileLayout>
  );
}