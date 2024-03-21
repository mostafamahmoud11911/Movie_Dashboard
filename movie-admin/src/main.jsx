import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext/AuthContext.jsx";
import UserContextProvider from "./context/UserContext/UserContext.jsx";
import MoviesContextProvider from "./context/MoviesContext/MoviesContext.jsx";
import ListContextProvider from "./context/ListsContext/ListsContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <MoviesContextProvider>
          <ListContextProvider>
            <App />
          </ListContextProvider>
        </MoviesContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
