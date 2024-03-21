import {
  Box,
  Typography,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { updateMovie } from "../../context/MoviesContext/ApiCall";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMovies } from "../../context/MoviesContext/MoviesContext";
import axios from "axios";

export default function Movie() {
  const { dispatch, loading, error } = useMovies();
  const [update, setUpdate] = useState(null);
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loadImg, setLoadImg] = useState(false);
  const inputRef = useRef();

  const {
    state: { movie },
  } = useLocation();

  const getData = ({ target }) => {
    setUpdate({ ...update, [target.name]: target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideo(file);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  const handleUploadImg = async (imgfile) => {
    if (img) {
      setLoadImg(true);
      const file = new FormData();
      file.append("file", imgfile);
      file.append("upload_preset", "upload");
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
          file
        );
        setLoadImg(false);
        return res.data.url;
      } catch (error) {
        setLoadImg(false);
        toast.error("someThing error happend in image or video upload");
      }
    }
  };

  const handleUploadVideo = async (vid) => {
    if (video) {
      setLoadImg(true);
      const file = new FormData();
      file.append("file", vid);
      file.append("upload_preset", "video_upload");
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/video/upload`,
          file
        );
        setLoadImg(false);
        return res.data.url;
      } catch (error) {
        setLoadImg(false);
        toast.error("someThing error happend in image or video upload");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (img && video) {
      const imgFile = await handleUploadImg(img);
      const videoFile = await handleUploadVideo(video);

      const newData = { ...update, img: imgFile, video: videoFile };

      const updateData = await updateMovie(newData, movie._id, dispatch);
      if (updateData) {
        toast.success("update movie success");
      } else {
        toast.error(error);
      }
    } else {
      if (update == null) {
        return;
      }
      const updateData = await updateMovie(update, movie._id, dispatch);
      if (updateData) {
        toast.success("update movie success");
      } else {
        toast.error(error);
      }
    }
  };



  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flex: 6 }}>
        <Navbar />
        <Box
          p={2}
          sx={{
            display: { md: "flex" },
            gap: 2,
            marginBottom: "10px",
          }}
        >
          <Box
            sx={{
              sm: { marginBottom: "10px" },
              flex: 1,
              bgcolor: "#fff",
              p: 3,
              borderRadius: 1,
            }}
          >
            <Typography variant="p" fontWeight="bold" fontSize={18}>
              Movie Information
            </Typography>
            <Box mt={2} display="flex" alignItems="center" gap={2}>
              <Avatar src={movie.img} />
              <Typography variant="p">{movie.title}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>Year: {movie.year}</Box>
            <Box sx={{ mt: 2 }}>Duration: {movie.duration}</Box>
            <Box sx={{ mt: 2 }}>limit: {movie.limit}</Box>
            <Box sx={{ mt: 2 }}>Genre: {movie.genre}</Box>
            <Box sx={{ mt: 2 }}>
              isSeries: {movie.isSeries ? "Series" : "Movies"}
            </Box>
          </Box>
          <Box sx={{ flex: 2 }}>
            <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 1 }}>
              <Typography variant="h5" mb={2}>
                Update Movie
              </Typography>
              <Box
                component="form"
                onSubmit={handleUpdate}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  label="Title"
                  variant="outlined"
                  name="title"
                  onChange={getData}
                  autoComplete="off"
                  fullWidth
                />
                <TextField
                  label="Descrption"
                  variant="outlined"
                  name="desc"
                  onChange={getData}
                  autoComplete="off"
                  fullWidth
                />
                <TextField
                  label="genre"
                  variant="outlined"
                  name="genre"
                  onChange={getData}
                  autoComplete="off"
                  fullWidth
                />
                <TextField
                  label="limit"
                  variant="outlined"
                  name="limit"
                  onChange={getData}
                  autoComplete="off"
                  fullWidth
                />
                <TextField
                  label="duration"
                  variant="outlined"
                  name="duration"
                  onChange={getData}
                  autoComplete="off"
                  fullWidth
                />
                <TextField
                  label="year"
                  variant="outlined"
                  name="year"
                  onChange={getData}
                  autoComplete="off"
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Is Series
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Is Series"
                    name="isSeries"
                    onChange={getData}
                    defaultValue={false}
                  >
                    <MenuItem value={true}>Series</MenuItem>
                    <MenuItem value={false}>Movies</MenuItem>
                  </Select>
                </FormControl>
                <Stack sx={{ width: "max-content" }}>
                  <Box sx={{ mb: 1 }}>
                    <label
                      htmlFor="file"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <CloudUploadIcon
                        sx={{ color: "#3F4D73", cursor: "pointer" }}
                      />
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setImg(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </Box>
                  <Box>
                    <label
                      htmlFor="file"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      onClick={handleChoose}
                    >
                      <CloudUploadIcon
                        sx={{ color: "#3F4D73", cursor: "pointer" }}
                      />
                      Upload Video
                    </label>
                    <input
                      ref={inputRef}
                      style={{ display: "none" }}
                      type="file"
                      onChange={handleFileChange}
                      accept=".mov,.mp4"
                    />
                  </Box>
                </Stack>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loadImg || loading}
                  sx={{
                    bgcolor: "#3F4D67",
                    "&:hover": {
                      backgroundColor: "#3F4D73",
                    },
                  }}
                  fullWidth
                >
                  Update Movie
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
}
