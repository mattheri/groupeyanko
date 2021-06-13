import { useRouter } from 'next/router';
import { useAuth } from './useAuth';
import { useEffect } from 'react';

const useProtectedRoute = () => {

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const reRoute = () => router.push('/');

  useEffect(() => {
    if (isAuthenticated) return;

    reRoute();
  }, [isAuthenticated]);
}

export default useProtectedRoute;
