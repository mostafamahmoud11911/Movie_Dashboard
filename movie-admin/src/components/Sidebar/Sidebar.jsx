import {
  Box,
  Typography,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: "#3F4D67",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          color: "white",
        }}
        p={2}
        mb={2}
      >
        <AdminPanelSettingsIcon />
        <Typography variant="h6" textAlign="center">
          Admin
        </Typography>
      </Box>

      <Divider />
      <Box
        color="#F4F7FA"
        sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 3 }}
      >
        <Link to="/" className="link">
          <MenuItem>
            <ListItemIcon>
              <HomeIcon sx={{ color: "#F4F7FA" }} />
            </ListItemIcon>
            Home
          </MenuItem>
        </Link>
        <Link to='/userlist' className="link">
          <MenuItem>
            <ListItemIcon>
              <GroupIcon sx={{ color: "#F4F7FA" }} />
            </ListItemIcon>
            Users
          </MenuItem>
        </Link>
        <Link to='/newuser' className="link">
          <MenuItem>
            <ListItemIcon>
              <GroupAddIcon sx={{ color: "#F4F7FA" }} />
            </ListItemIcon>
            Add User
          </MenuItem>
        </Link>

        <Link to='/movielist' className="link">
          <MenuItem>
            <ListItemIcon>
              <LiveTvIcon sx={{ color: "#F4F7FA" }} />
            </ListItemIcon>
            Movies
          </MenuItem>
        </Link>

        <Link to='/newMovie' className="link">
          <MenuItem>
            <ListItemIcon>
              <PlaylistAddIcon sx={{ color: "#F4F7FA" }} />
            </ListItemIcon>
            Add Movie
          </MenuItem>
        </Link>

        <Link to='/listslist' className="link">
          <MenuItem>
            <ListItemIcon>
              <PlaylistPlayIcon sx={{ color: "#F4F7FA" }} />
            </ListItemIcon>
            Lists
          </MenuItem>
        </Link>

        <Link to='/newList' className="link">
          <MenuItem>
            <ListItemIcon>
              <PlaylistAddIcon sx={{ color: "#F4F7FA" }} />
            </ListItemIcon>
            Add List
          </MenuItem>
        </Link>
      </Box>
    </Box>
  );
}
