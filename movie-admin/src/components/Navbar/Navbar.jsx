import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  MenuItem,
  Avatar,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { Logout } from "../../context/AuthContext/AuthAction";
import {useNavigate} from 'react-router-dom'

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();


  const handleClose = () => {
    setAnchorEl(null);
  };

  const { dispatch, user } = useAuth();

  const handleLogout = () => {
    handleClose();
    dispatch(Logout);
    localStorage.removeItem("userData");
    navigate('/login')
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#fff", color: "#3f4d67" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Dashboard
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton sx={{ p: 0 }} onClick={handleClick}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {user ? (
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            ) : (
              <Link to={`/login`} className="link">
                <MenuItem onClick={handleClose}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              </Link>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
