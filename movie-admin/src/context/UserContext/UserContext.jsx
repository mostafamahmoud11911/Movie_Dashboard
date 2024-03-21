import { createContext, useContext, useReducer } from "react";
import UserReducer from "./UserReducer";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const UserContext = createContext(initialState);

export const useUsers = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  return (
    <UserContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
