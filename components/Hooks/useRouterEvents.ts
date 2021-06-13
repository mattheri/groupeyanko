import { useRouter } from 'next/router';
import { useEffect } from 'react';

type RouterEvents = 'routeChangeStart' | 'routeChangeComplete' | 'routeChangeError' | 'beforeHistoryChange';

const useRouterEvents = (event:RouterEvents, handler:() => void) => {
  const router = useRouter();
  useEffect(() => {
    if (!handler) return;
    
    router.events.on(event, handler);

    return () => router.events.off(event, handler);
  }, [handler]);
};

export default useRouterEvents;
