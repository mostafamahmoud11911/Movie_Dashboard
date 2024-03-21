import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLists } from "../../context/ListsContext/ListsContext";
import { useMovies } from "../../context/MoviesContext/MoviesContext";
import { useEffect } from "react";
import { getMovies } from "../../context/MoviesContext/ApiCall";
import { createList } from "../../context/ListsContext/ApiCall";

const listSchema = yup.object({
  title: yup.string().required(),
  type: yup.string().required(),
  genre: yup.string().required(),
  content: yup.array().required(),
});

export default function NewList() {
  const { dispatch, loading,error } = useLists();
  const { movies, dispatch: dispatchMovies } = useMovies();

  useEffect(() => {
    getMovies(dispatchMovies);
  }, [dispatchMovies]);

  const handleCreate = async (list) => {
    const listData = await createList(list, dispatch);

    if (listData) {
      toast.success("Add list success");
    } else {
      toast.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      genre: "",
      content: [],
    },
    validationSchema: listSchema,
    onSubmit: handleCreate,
  });

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flex: 6 }}>
        <Navbar />
        <Box p={2}>
          <Box sx={{ bgcolor: "#fff", borderRadius: "5px", p: 2 }}>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="title"
                name="title"
                autoComplete="off"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helpertext={formik.touched.title && formik.errors.title}
                variant="outlined"
                fullWidth
              />

              <TextField
                label="genre"
                variant="outlined"
                name="genre"
                autoComplete="off"
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.genre && Boolean(formik.errors.genre)}
                helpertext={formik.touched.genre && formik.errors.genre}
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label-type">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label-type"

                  label="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helpertext={formik.touched.type && formik.errors.type}
                >
                  <MenuItem value={"series"}>Series</MenuItem>
                  <MenuItem value={"movies"}>movie</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label-content">Content</InputLabel>
                <Select
                  labelId="demo-simple-select-label-content"

                  label="content"
                  name="content"
                  multiple
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.content && Boolean(formik.errors.content)
                  }
                  helpertext={formik.touched.content && formik.errors.content}
                >
                  {movies.map((movie) => (
                    <MenuItem key={movie._id} value={movie._id}>
                      {movie.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  bgcolor: "#3F4D67",
                  "&:hover": {
                    backgroundColor: "#3F4D73",
                  },
                }}
              >
                Add List
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
}
