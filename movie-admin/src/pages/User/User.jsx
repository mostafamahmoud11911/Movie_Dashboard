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
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { updateUser } from "../../context/UserContext/ApiCall";
import { useUsers } from "../../context/UserContext/UserContext";
import noImg from "/noImg.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User() {
  const [file, setFile] = useState(null);
  const {
    state: { user },
  } = useLocation();
  const { dispatch, error, loading } = useUsers();

  const [update, setUpdate] = useState(null);

  const getData = ({ target }) => {
    setUpdate({ ...update, [target.name]: target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
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
        const userData = { ...update, imgProfile: res.data.url };

        const dataReturn = await updateUser(userData, user._id, dispatch);
        if(dataReturn){
          toast.success("Update user success");
        }
        
      } catch (error) {
        toast.error(error.response.data.error.message);
      }
    } else {
      const dataReturn = await updateUser(update,user._id, dispatch);
      if(dataReturn){
        toast.success("Update user success");
      }else{
        toast.error(error)
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
              User Information
            </Typography>
            <Box mt={2} display="flex" alignItems="center" gap={2}>
              <Avatar src={user?.imgProfile} />
              <Typography variant="p">{user.username}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>Email: {user.email}</Box>
            <Box sx={{ mt: 2 }}>Age: {user.age}</Box>
            <Box sx={{ mt: 2 }}>Phone: {user.phone}</Box>
            <Box sx={{ mt: 2 }}>IsAdmin: {user.isAdmin ? "Yes" : "No"}</Box>
          </Box>
          <Box sx={{ flex: 2 }}>
            <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 1 }}>
              <Typography variant="h5" mb={2}>
                Update User
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
                  label="Username"
                  variant="outlined"
                  name="username"
                  autoComplete="off"
                  onChange={getData}
                  fullWidth
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  autoComplete="off"
                  onChange={getData}
                  fullWidth
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  name="password"
                  autoComplete="off"
                  onChange={getData}
                  fullWidth
                />
                <TextField
                  label="Phone"
                  variant="outlined"
                  name="phone"
                  autoComplete="off"
                  onChange={getData}
                  fullWidth
                />
                <TextField
                  label="Age"
                  variant="outlined"
                  name="age"
                  autoComplete="off"
                  onChange={getData}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Is Admin
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    name="isAdmin"
                    onChange={getData}
                    defaultValue={false}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
                <Stack direction="row" alignItems="center" gap={3}>
                  <img
                    src={file ? URL.createObjectURL(file) : noImg}
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
                  fullWidth
                >
                  Update User
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <ToastContainer/>
    </Box>
  );
}
