import { Box, Button } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useMovies } from "../../context/MoviesContext/MoviesContext";
import { deleteMovie, getMovies } from "../../context/MoviesContext/ApiCall";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";

export default function MoviesList() {
  const { dispatch, movies, loading, error } = useMovies();
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");
  const [movieTitle, setMovieTitle] = useState("");

  useEffect(() => {
    getMovies(dispatch);
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
    deleteMovie(id, dispatch);
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "title",
      headerName: "Title",
      width: 170,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <img
              src={params.row.img}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              alt=""
            />
            {params.row.title}
          </Box>
        );
      },
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 150,
    },
    {
      field: "year",
      headerName: "Year",
      width: 120,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 120,
    },
    {
      field: "limit",
      headerName: "Limit",
      width: 120,
    },
    {
      field: "isSeries",
      headerName: "isSeries",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Button
              color="error"
              variant="outlined"
              size="small"
              onClick={() => {
                getId(params.row._id);
                setMovieTitle(params.row.title);
              }}
            >
              DELETE
            </Button>
            <Link to={`/movie/${params.row._id}`} state={{ movie: params.row }}>
              <Button color="success" variant="outlined" size="small">
                UPDATE
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
        <Box p={2}>
          <Box sx={{ width: "100%", height: "90%", bgcolor: "#fff" }}>
            {loading ? (
              <Box sx={{ fontSize: 50 }}>Loading..........</Box>
            ) : (
              <DataGrid
                rows={movies.length > 0 ? movies : []}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 8 },
                  },
                }}
                getRowId={(r) => r._id}
                pageSizeOptions={[5, 10]}
              />
            )}
          </Box>
        </Box>
      </Box>
      {openModal && (
        <Modal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          title={movieTitle}
        />
      )}
      <ToastContainer />
    </Box>
  );
}
