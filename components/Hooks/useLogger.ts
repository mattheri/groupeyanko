import { useEffect } from 'react';

const useLogger = (valueToLog:any) => {
  useEffect(() => {
    console.log(valueToLog);
  }, [valueToLog]);
}

export default useLogger;
