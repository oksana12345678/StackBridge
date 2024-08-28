import Snackbar from "@mui/material/Snackbar";

const Toaster = ({ toasterIsOpen, closeToaster, message, type }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeToaster();
  };

  return (
    <Snackbar
      open={toasterIsOpen}
      autoHideDuration={2000}
      onClose={handleClose}
      message={message}
    />
  );
};

export default Toaster;