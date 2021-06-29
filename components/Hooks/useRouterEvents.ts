import { useRouter } from 'next/router';
import { useEffect } from 'react';

type RouterEvents = 'routeChangeStart' | 'routeChangeComplete' | 'routeChangeError' | 'beforeHistoryChange';

interface Shallow {
  shallow:boolean;
}

export type RouterEventCallback = (url?:string, shallow?:Shallow) => void;

const useRouterEvents = (event:RouterEvents, handler:RouterEventCallback) => {
  const router = useRouter();
  useEffect(() => {
    if (!handler) return;
    
    router.events.on(event, handler);

    return () => router.events.off(event, handler);
  }, [handler]);
};

export default useRouterEvents;
