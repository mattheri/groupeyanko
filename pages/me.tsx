import useProtectedRoute from "components/Hooks/useProtectedRoute";
import Profile from "components/Profile/Profile";

export default function Me() {
  useProtectedRoute();

  return <Profile />
}