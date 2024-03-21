import {
  Box,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMovies } from "../../context/MoviesContext/MoviesContext";
import { createMovie } from "../../context/MoviesContext/ApiCall";
import { useEffect, useRef, useState } from "react";
import noImg from "/noImg.jpg";
import axios from "axios";

const movieSchema = yup.object({
  title: yup.string().required(),
  desc: yup.string().required(),
  year: yup.string().required(),
  duration: yup.string().required(),
  limit: yup.string().required(),
  genre: yup.string().required(),
  isSeries: yup.boolean().required(),
});

export default function NewMovie() {
  const { dispatch, loading, error } = useMovies();
  const [img, setImg] = useState(null);
  const inputRef = useRef();
  const [source, setSource] = useState();
  const [video, setVideo] = useState(null);
  const [loadImg, setIoadImg] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideo(file);
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  const handleUploadImg = async (img) => {
    if (img) {
      setIoadImg(true);
      const file = new FormData();
      file.append("file", img);
      file.append("upload_preset", "upload");
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
          file
        );
        setIoadImg(false);
        return res.data.url;
      } catch (error) {
        setIoadImg(false);
        toast.error("someThing error happend in image or video upload");
      }
    }
  };

  const handleUploadVideo = async (vid) => {
    if (vid) {
      setIoadImg(true);
      const file = new FormData();
      file.append("file", vid);
      file.append("upload_preset", "video_upload");
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/video/upload`,
          file
        );
        setIoadImg(false);
        return res.data.url;
      } catch (error) {
        setIoadImg(false);
        toast.error("someThing error happend in image or video upload");
      }
    }
  };

  const handleCreate = async (movie) => {
    const imgFile = await handleUploadImg(img);
    const videoFile = await handleUploadVideo(video);

    const newData = { ...movie, img: imgFile, video: videoFile };

    const movieData = await createMovie(newData, dispatch);
    if (movieData) {
      toast.success("Add movie success");
    } else {
      toast.error(error);
    }
  };



  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      year: "",
      duration: "",
      limit: "",
      genre: "",
      isSeries: false,
    },
    validationSchema: movieSchema,
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
                label="desc"
                name="desc"
                autoComplete="off"
                value={formik.values.desc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.desc && Boolean(formik.errors.desc)}
                helpertext={formik.touched.desc && formik.errors.desc}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="genre"
                variant="outlined"
                type="genre"
                name="genre"
                autoComplete="off"
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.genre && Boolean(formik.errors.genre)}
                helpertext={formik.touched.genre && formik.errors.genre}
                fullWidth
              />
              <TextField
                label="limit"
                name="limit"
                autoComplete="off"
                value={formik.values.limit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.limit && Boolean(formik.errors.limit)}
                helpertext={formik.touched.limit && formik.errors.limit}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="duration"
                name="duration"
                autoComplete="off"
                value={formik.values.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.duration && Boolean(formik.errors.duration)
                }
                helpertext={formik.touched.duration && formik.errors.duration}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="year"
                name="year"
                autoComplete="off"
                value={formik.values.year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helpertext={formik.touched.year && formik.errors.year}
                variant="outlined"
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is Series</InputLabel>
                <Select
                  label="isSeries"
                  name="isSeries"
                  value={formik.values.isSeries}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.isSeries && Boolean(formik.errors.isSeries)
                  }
                  helpertext={formik.touched.isSeries && formik.errors.isSeries}
                >
                  <MenuItem value={true}>Series</MenuItem>
                  <MenuItem value={false}>movie</MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row" justifyContent="center" gap="10rem">
                <Stack direction="row" alignItems="center" gap={3}>
                  <img
                    src={img ? URL.createObjectURL(img) : noImg}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    alt=""
                  />
                  <label htmlFor="img">
                    <CloudUploadIcon
                      sx={{
                        color: "#3F4D67",
                        fontSize: "30px",
                        cursor: "pointer",
                      }}
                    />
                  </label>
                  <input
                    type="file"
                    id="img"
                    onChange={(e) => setImg(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </Stack>

                <Stack direction="row" alignItems="center" gap={3}>
                  <input
                    ref={inputRef}
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleFileChange}
                    accept=".mov,.mp4"
                  />

                  {!source && (
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#3F4D67",
                        "&:hover": {
                          backgroundColor: "#3F4D73",
                        },
                      }}
                      onClick={handleChoose}
                      type="button"
                    >
                      Choose
                    </Button>
                  )}
                  {source && (
                    <video
                      className="VideoInput_video"
                      width="100%"
                      height={100}
                      controls
                      src={source}
                    />
                  )}
                  <div className="VideoInput_footer">
                    {source ? "Video selected" : "" || "Nothing selectd"}
                  </div>
                </Stack>
              </Stack>

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
                {loadImg ? "Add Movie........" : "Add Movie"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
}
