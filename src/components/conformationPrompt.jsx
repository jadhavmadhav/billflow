import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { IoCloseCircleOutline } from "react-icons/io5";

const ConformationPrompt = ({
  isOpen,
  handleOk,
  header,
  handleCancel,
  children,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleCancel}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "450px",
          bgcolor: "white",
          borderRadius: "8px",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 2,
            bgcolor: "#4062ecc7",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            {header}
          </Typography>
          <IconButton onClick={handleCancel} sx={{ color: "white" }}>
            <IoCloseCircleOutline fontSize="inherit" />
          </IconButton>
        </Box>
        <Box
          sx={{
            px: 2,
            py: 1,
            boxShadow: 1,
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            px: 2,
            py: 2,
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px",
          }}
        >
          <Typography
            component="button"
            onClick={handleCancel}
            sx={{
              cursor: "pointer",
              color: "#f44336",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Cancel
          </Typography>
          <Typography
            component="button"
            onClick={handleOk}
            sx={{
              cursor: "pointer",
              color: "#4caf50",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Ok
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConformationPrompt;
