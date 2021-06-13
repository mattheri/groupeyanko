import { useBreadcrumbs } from "components/Hooks/useBreadcrumbs";
import useProtectedRoute from "components/Hooks/useProtectedRoute";
import Profile from "components/Profile/Profile";
import { useEffect } from 'react';

export default function Me() {
  useProtectedRoute();
  const { setNavigationState } = useBreadcrumbs();
  useEffect(() => {
    setNavigationState(["Profil", "/me"]);
  }, []);

  return <Profile />
}