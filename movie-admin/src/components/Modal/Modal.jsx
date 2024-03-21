import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ReactDom from "react-dom";

export default function Modal({ handleCloseModal, title, handleDelete }) {
  return ReactDom.createPortal(
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
        boxShadow: "0px 10px 65px -3px rgba(0,0,0,0.1)",
        bgcolor: "#fff",
        width: 400,
        height: 200,
        borderRadius: 3,
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ color: "red", fontSize: "25px" }} variant="p">
        Delete
      </Typography>
      <Typography variant="p" my={2}>
        Do you want delete <span>{title}</span> !
      </Typography>
      <Box sx={{ my: 2 }}>
        <Button
          variant="contained"
          color="error"
          sx={{ mr: 1 }}
          onClick={() => {
            handleCloseModal();
            handleDelete()
          }}
        >
          Delete
        </Button>
        <Button variant="contained" color="inherit" onClick={handleCloseModal}>
          Cencle
        </Button>
      </Box>
    </Box>,
    document.getElementById("modal-root")
  );
}
