import {
  Box,
  Grid,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link,useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { loginUser } from "../../context/AuthContext/ApiCall";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const LoginSchema = yup.object({
  username: yup.string().required(),
  password: yup
    .string()
    .required()
    .matches(
      "^[A-Za-z]{3,9}[0-9]{0,3}$",
      "Must Contain from 3 to 9 Characters"
    ),
});

export default function Login() {
  const { dispatch, error, loading } = useAuth();
  const navigate = useNavigate()

  // send user data to api call to sign in
  const handleLogin =async (user) => {
    const returnState = await loginUser(user, dispatch);
    if(returnState){
      navigate("/")
    }
  };

  // render error
  useEffect(() => {
    if (error) toast.error(error);
  }, [error, dispatch]);

  // handle inputs with formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: handleLogin,
  });

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Box sx={{ textAlign: "end", p: 2 }}>
        <Link to="/" className="link">
          <HomeIcon />
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
          marginBottom: "3rem",
        }}
      >
        <AdminPanelSettingsIcon sx={{ fontSize: "35px", color: "#04649D" }} />
        <Typography variant="h4">Login</Typography>
      </Box>
      <Container maxWidth="md">
        <Grid container>
          <Grid
            item
            md={6}
            xs={12}
            height={400}
            sx={{ bgcolor: "#fff", p: "3rem", border: "1px solid #ddd" }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", pb: 5 }}>
              <Typography variant="p" fontWeight="bold" marginBottom="5px">
                Welcome Back !
              </Typography>
              <Typography variant="p" sx={{ color: "gray" }}>
                Sign in to continue
              </Typography>
            </Box>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
            >
              <TextField
                label="Username"
                variant="outlined"
                name="username"
                autoComplete="off"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                autoComplete="off"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
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
                Login
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            md={6}
            height={400}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <img
              src="/login.jpg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt=""
            />
          </Grid>
        </Grid>
      </Container>
      <ToastContainer />
    </Box>
  );
}
