import React, { createContext, useState } from "react";
import Loader from "../../components/loader/Loader";

export const LoaderContext = createContext({
  showLoader: () => {},
  hideLoader: () => {},
});

export function LoaderProvider({ children }) {
  const [show, setShow] = useState(false);

  const showLoader = () => setShow(true);
  const hideLoader = () => setShow(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {show && <Loader />}
      <>{children}</>
    </LoaderContext.Provider>
  );
}
