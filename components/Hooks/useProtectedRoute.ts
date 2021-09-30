import { useRouter } from 'next/router';
import { useAuth } from './useAuth';
import { useEffect } from 'react';

const useProtectedRoute = () => {

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const reRoute = () => router.push('/');

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) return;

    reRoute();
  }, [isAuthenticated]);
}

export default useProtectedRoute;
