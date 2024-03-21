import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserTable() {
  const [newUsers, setNewUsers] = useState([]);

  const getNewUsers = async () => {
    try {
      const { data } = await axios.get(
        `https://api-cmuv.onrender.com/api/users?new=true`,
        {
          headers: {
            token: `Bearer ${
              JSON.parse(localStorage.getItem("userData")).token
            }`,
          },
        }
      );
      console.log(data);
      setNewUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewUsers();
  }, []);
  return (
    <Box sx={{ mt: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newUsers.map((user) => (
              <TableRow
              key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{user._id}</TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.age}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
