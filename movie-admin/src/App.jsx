import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import Home from "./pages/Home/Home";
import UserList from "./pages/UserList/UserList";
import NewUser from "./pages/NewUser/NewUser";
import User from "./pages/User/User";
import MoviesList from "./pages/MoviesList/MoviesList";
import Movie from "./pages/Movie/Movie";
import NewMovie from "./pages/NewMovie/NewMovie";
import ListsList from "./pages/ListsList/ListsList";
import List from "./pages/List/List";
import NewList from "./pages/NewList/NewList";
import Login from "./pages/Login/Login";
import { useAuth } from "./context/AuthContext/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/userlist",
    element: (
      <ProtectedRoute>
        <UserList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/newuser",
    element: (
      <ProtectedRoute>
        <NewUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
  },
  {
    path: "/movielist",
    element: (
      <ProtectedRoute>
        <MoviesList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/movie/:id",
    element: (
      <ProtectedRoute>
        <Movie />
      </ProtectedRoute>
    ),
  },
  {
    path: "/newMovie",
    element: (
      <ProtectedRoute>
        <NewMovie />
      </ProtectedRoute>
    ),
  },
  {
    path: "/listslist",
    element: (
      <ProtectedRoute>
        <ListsList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/list/:id",
    element: (
      <ProtectedRoute>
        <List />
      </ProtectedRoute>
    ),
  },
  {
    path: "/newList",
    element: (
      <ProtectedRoute>
        <NewList />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <Box sx={{ bgcolor: "#f4f7fa" }}>
      <CssBaseline />
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
