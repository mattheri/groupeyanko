import { forwardRef, useImperativeHandle, useState } from "react";
import Loader from "./Loader";

export interface LoaderRef {
  startLoading:() => void;
  stopLoading:() => void;
}

const LoaderController = forwardRef(({}, ref:any) => {
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle<LoaderRef, any>(ref, () => ({
    startLoading: () => setIsLoading(true),
    stopLoading: () => setIsLoading(false),
  }))

  return isLoading && <Loader />;
});

export default LoaderController;
