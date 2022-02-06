import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ErrorStateContext = createContext();
const ErrorStateProvider = ErrorStateContext.Provider;

function ErrorProvider({ children }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  useEffect(() => {}, []);
  function updateErrors(error) {
    setErrors([...errors, error]);
  }
  return (
    <ErrorStateProvider
      value={{
        errors,
        updateErrors,
      }}
    >
      {children}
    </ErrorStateProvider>
  );
}

function useErrorState() {
  const all = useContext(ErrorStateContext);
  return all;
}
export { ErrorProvider, useErrorState };
