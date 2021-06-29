import { FC, useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

interface Props {
  error: string;
  autoDismiss?:boolean;
  dismissDelay?:number;
}

const DEFAULT_DISMISS_DELAY = 3000;

const ErrorAlert: FC<Props> = ({ error, autoDismiss, dismissDelay = DEFAULT_DISMISS_DELAY }) => {
  const [errorMsg, setErrorMsg] = useState(error);

  useEffect(() => {
    let timeout:NodeJS.Timeout;

    if (autoDismiss) {
      timeout = setTimeout(() => {
        setErrorMsg('');
      }, dismissDelay);
    }

    return () => clearTimeout(timeout);
  }, [autoDismiss, dismissDelay]);

  useEffect(() => {
    setErrorMsg(error);
  }, [error]);
  
  return <>{errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}</>;
};

export default ErrorAlert;
