import useProtectedRoute from "components/Hooks/useProtectedRoute";
import ProfileLayout from "components/ProfileLayout/organism/ProfileLayout";
import UpdatePassword from "components/UpdatePassword/organism/UpdatePassword";
import { ReactNode } from "react";

export default function ChangePassword() {
  useProtectedRoute();

  return <UpdatePassword />
}

ChangePassword.getLayout = function getLayout(page:ReactNode) {
  return(
    <ProfileLayout>
      {page}
    </ProfileLayout>
  );
}