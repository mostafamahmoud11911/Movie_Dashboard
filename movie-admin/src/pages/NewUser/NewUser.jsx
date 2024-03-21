import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useFormik } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { createUser } from "../../context/UserContext/ApiCall";
import { useUsers } from "../../context/UserContext/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noImg from "/noImg.jpg";

const createSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      "^[A-Za-z]{3,9}[0-9]{0,3}$",
      "Must Contain from 3 to 9 Characters"
    ),
  phone: yup.string().required(),
  age: yup.number().max(95).min(18).required(),
});

export default function NewUser() {
  const [file, setFile] = useState(null);
  const { dispatch, error, loading } = useUsers();
  console.log(error)

  const handleNewUser = async (user) => {
    // set image in cloudinary
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
          data
        );
        // create new object to set img with prev data
        const userData = { ...user, imgProfile: res.data.url };

        const returnData = await createUser(userData, dispatch);
        if(returnData){
          toast.success('Add user success');
        }else{
          toast.error(error);
        }
        
      } catch (error) {
        toast.error(error.response.data.error.message);
      }
    } else {
      const returnData = await createUser(user, dispatch);
      if(returnData){
        toast.success('Add user success');
      }else{
        toast.error(error);
      }
    }
  };


  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      age: "",
      phone: "",
      isAdmin: "",
    },
    validationSchema: createSchema,
    onSubmit: handleNewUser,
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
                label="username"
                name="username"
                autoComplete="off"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helpertext={formik.touched.username && formik.errors.username}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="email"
                name="email"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helpertext={formik.touched.email && formik.errors.email}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="password"
                variant="outlined"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helpertext={formik.touched.password && formik.errors.password}
                fullWidth
              />
              <TextField
                label="age"
                name="age"
                autoComplete="off"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helpertext={formik.touched.age && formik.errors.age}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="phone"
                name="phone"
                autoComplete="off"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helpertext={formik.touched.phone && formik.errors.phone}
                variant="outlined"
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is Admin</InputLabel>
                <Select
                  label="IsAdmin"
                  name="isAdmin"
                  value={formik.values.isAdmin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.isAdmin && Boolean(formik.errors.isAdmin)
                  }
                  helpertext={formik.touched.isAdmin && formik.errors.isAdmin}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row" alignItems="center" gap={3}>
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : noImg
                  }
                  style={{
                    width: "60px",
                    height: "60px",
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
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
                Add User
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
}
