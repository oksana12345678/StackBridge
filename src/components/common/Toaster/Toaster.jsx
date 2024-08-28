
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { IoMdClose } from "react-icons/io";
import css from "./Toaster.module.css";

const Toaster = ({ toasterIsOpen, closeToaster, message, type }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeToaster();
  };

  const action = (
    <button className={css["close-btn"]} onClick={handleClose}>
      <IoMdClose className={css["close-icon"]} />
    </button>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={toasterIsOpen}
      autoHideDuration={2000}
      onClose={handleClose}
      sx={{
        "& .MuiSnackbarContent-root": {
          width: "auto",
          backgroundColor: "var(--primary-white-color)",
          boxShadow: "none",
          border: type === "success" ? "1px solid green" : "1px solid red",
        },
      }}
    >
      <SnackbarContent
        action={action}
        message={message}
        sx={{
          color: type === "success" ? "green" : "red",
          display: "flex",
          alignItems: "center",
        }}
      />
    </Snackbar>
  );
};

export default Toaster;
