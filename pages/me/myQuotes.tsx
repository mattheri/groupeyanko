import useProtectedRoute from "components/Hooks/useProtectedRoute";
import MyQuotes from "components/MyQuotes/organism/MyQuotes";
import { ReactNode } from "react";
import ProfileLayout from "components/ProfileLayout/organism/ProfileLayout";

export default function Quotes() {
  useProtectedRoute();

  return <MyQuotes />;
}

Quotes.getLayout = function getLayout(page:ReactNode) {

  return(
    <ProfileLayout>
      {page}
    </ProfileLayout>
  );
}