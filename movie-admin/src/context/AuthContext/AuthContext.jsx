import { createContext, useContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
  user: JSON.parse(localStorage.getItem("userData")) || null,
  loading: false,
  error: null,
};

const AuthContext = createContext(initialState);


export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);




  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
