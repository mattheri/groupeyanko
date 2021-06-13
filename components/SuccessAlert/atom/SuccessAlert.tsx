import { FC, useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

interface Props {
  success: string;
  autoDismiss?:boolean;
  dismissDelay?:number;
}

const DEFAULT_AUTO_DISMISS_DELAY = 3000;

const SuccessAlert: FC<Props> = ({ success, autoDismiss, dismissDelay = DEFAULT_AUTO_DISMISS_DELAY }) => {
  const [successMsg, setSuccessMsg] = useState(success);

  useEffect(() => {
    let timeout:NodeJS.Timeout;

    if (autoDismiss) {
      timeout = setTimeout(() => {
        setSuccessMsg('');
      }, dismissDelay);
    }

    return () => clearTimeout(timeout);
  }, [autoDismiss, dismissDelay]);

  useEffect(() => {
    if (success !== successMsg) setSuccessMsg(success);
  }, [success]);

  return <>{successMsg && <Alert variant='success'>{successMsg}</Alert>}</>;
};

export default SuccessAlert;
