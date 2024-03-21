import { createContext, useContext, useReducer } from "react";
import ListReducer from "./ListsReducer";

const initialState = {
  lists: [],
  loading: false,
  error: null,
};

const ListsContext = createContext(initialState);

export const useLists = () => {
  return useContext(ListsContext);
};

const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, initialState);
  return (
    <ListsContext.Provider
      value={{
        lists: state.lists,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export default ListContextProvider;
