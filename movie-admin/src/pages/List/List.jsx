import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useLists } from "../../context/ListsContext/ListsContext";
import { useMovies } from "../../context/MoviesContext/MoviesContext";
import { useEffect, useState } from "react";
import { getMovies } from "../../context/MoviesContext/ApiCall";
import { updateList } from "../../context/ListsContext/ApiCall";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function List() {
  const {
    state: { list },
  } = useLocation();
  const { dispatch, loading,error } = useLists();
  const { movies, dispatch: dispatchMovies } = useMovies();

  const [update, setUpdate] = useState(null);

  const getUpdate = ({ target }) => {
    setUpdate({ ...update, [target.name]: target.value });
  };

  useEffect(() => {
    getMovies(dispatchMovies);
  }, [dispatchMovies]);

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setUpdate({ ...update, content: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedReturn = await updateList(update, list._id, dispatch);
    if (updatedReturn) {
      toast.success("list has been updated!");
    } else {
      toast.error(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flex: 6 }}>
        <Navbar />
        <Box p={2}>
          <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 1 }}>
            <Typography variant="h5" mb={2}>
              Update List
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography variant="p">title: {list.title}</Typography>
              <Typography variant="p">type: {list.type}</Typography>
              <Typography variant="p">genre: {list.genre}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#fff",
              p: 2,
              borderRadius: 1,
              mt: 3,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            component="form"
            onSubmit={handleUpdate}
          >
            <TextField
              label="title"
              variant="outlined"
              name="title"
              autoComplete="off"
              onChange={getUpdate}
              fullWidth
            />
            <TextField
              label="genre"
              variant="outlined"
              name="genre"
              autoComplete="off"
              onChange={getUpdate}
              fullWidth
            />
            <label htmlFor="">Type</label>
            <select
              name="type"
              style={{
                padding: "15px",
                border: "2px solid #ddd",
                fontSize: "17px",
                outline: "none",
              }}
              onChange={getUpdate}
            >
              <option value="series">Series</option>
              <option value="movies">Movies</option>
            </select>

            <label htmlFor="">Content</label>
            <select
              multiple
              name="content"
              style={{
                padding: "15px",
                border: "2px solid #ddd",
                fontSize: "17px",
                outline: "none",
              }}
              onChange={handleSelect}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: "#3F4D67",
                "&:hover": {
                  backgroundColor: "#3F4D73",
                },
              }}
            >
              Update List
            </Button>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
}
