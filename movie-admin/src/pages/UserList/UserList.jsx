import { Box, Button } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../context/UserContext/ApiCall";
import { useUsers } from "../../context/UserContext/UserContext";
import noImg from "/noImg.jpg";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserList() {
  const { dispatch, users, loading, error } = useUsers();
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch, id]);

  // get user id to do check delete user with modal
  const getId = (id) => {
    setId(id);
    setOpenModal(true);
  };
  // handle modal
  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  //handle delete user
  const handleDelete = () => {
    deleteUser(id, dispatch);
  };
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "Username",
      width: 180,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <img
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={params.row.imgProfile ? params.row.imgProfile : noImg}
              alt=""
            />
            {params.row.username}
          </Box>
        );
      },
    },
    { field: "email", headerName: "Email", width: 170 },
    {
      field: "phone",
      headerName: "Phone",
      sortable: false,
      width: 130,
    },
    {
      field: "age",
      headerName: "Age",
      width: 150,
    },
    {
      field: "isAdmin",
      headerName: "IsAdmin",
      sortable: false,
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ mr: "5px" }}
              onClick={() => {
                getId(params.row._id);
                setUsername(params.row.username);
              }}
            >
              Delete
            </Button>
            <Link to={`/user/${params.row._id}`} state={{ user: params.row }}>
              <Button variant="outlined" color="success" size="small">
                Update
              </Button>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flex: 6 }}>
        <Navbar />

        <Box p={2} position="relative">
          <Box sx={{ width: "100%", height: "90%", bgcolor: "#fff" }}>
            {loading ? (
              <Box sx={{ fontSize: 50 }}>Loading..........</Box>
            ) : (
              <DataGrid
                rows={users.length > 0 ? users : []}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 8 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                getRowId={(r) => r._id}
              />
            )}
          </Box>
        </Box>
      </Box>
      {openModal && (
        <Modal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          title={username}
        />
      )}
      <ToastContainer />
    </Box>
  );
}
