import { Box, Button } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLists } from "../../context/ListsContext/ListsContext";
import { deleteList, getLists } from "../../context/ListsContext/ApiCall";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CachedIcon from '@mui/icons-material/Cached';



export default function ListsList() {
  const { dispatch, lists, loading, error } = useLists();
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");
  const [listTitle, setListTitle] = useState("");

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  // get user id to do check delete user with modal
  const getId = (id) => {
    setId(id);
    setOpenModal(true);
  };

  // handle modal
  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  // handle delete

  const handleDelete = () => {
    deleteList(id, dispatch);
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const columns = [
    { field: "_id", headerName: "ID", width: 230 },
    { field: "title", headerName: "Title", width: 240 },
    { field: "type", headerName: "type", width: 260 },
    {
      field: "genre",
      headerName: "Genre",
      width: 170,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Button
            variant="outlined"
            onClick={() => {
              getId(params.row._id);
              setListTitle(params.row.title);
            }}
            size="small"
            color="error"
          >
            DELETE
          </Button>
          <Link to={`/list/${params.row._id}`} state={{ list: params.row }}>
            <Button variant="outlined" size="small" color="success">
              UPDATE
            </Button>
          </Link>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flex: 6 }}>
        <Navbar />
        <Box p={2}>
          <Box sx={{ width: "100%", height: "90%", bgcolor: "#fff" }}>
            {loading ? (
              <Box sx={{ fontSize: 50 }}>Loading..........</Box>
            ) : (
              <DataGrid
                rows={lists.length > 0 ? lists : []}
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
          title={listTitle}
        />
      )}
      <ToastContainer />
    </Box>
  );
}
