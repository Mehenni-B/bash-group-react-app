import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

interface AlertProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const DeleteAlert: React.FC<AlertProps> = ({ setOpen, open }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    setOpen(false);
  };

  const buttonStyles = {padding: "1rem",width: "160px",height: "56px",fontSize: 16,fontWeight: 600,borderRadius: "500px",color: "#fff",boxShadow: "none","&:hover": {  boxShadow: "none",},};

  const cancelButtonStyles = {  ...buttonStyles,  background: "#1077BC",  "&:hover": {    ...buttonStyles["&:hover"],    background: "#194867",  },};

  const cancelButtonProps = {
    onClick: handleClose,
    sx: cancelButtonStyles,
    autoFocus: true,
  };

  const cancelButton = <Button {...cancelButtonProps}>تراجع</Button>;

  const confirmButtonStyles = {
    ...buttonStyles,
    background: "#DB161B",
    "&:hover": {
      ...buttonStyles["&:hover"],
      background: "#8e2023",
    },
  };

  const confirmButtonText = "إلغاء الطلب";
  const confirmButtonOnClick = handleClose;

  const confirmButtonProps = {
    onClick: confirmButtonOnClick,
    sx: confirmButtonStyles,
  };

  const confirmButton = (
    <Button {...confirmButtonProps}>{confirmButtonText}</Button>
  );

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, padding: "1.5rem 6rem", alignItems: "center" }}>
        <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: "bold", color: "#272727", fontSize: "28px" }}>
          {"إلغاء الطلب"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#272727", fontSize: "18px", fontWeight: "500" }}>
            هل تريد حقًا إلغاء هذا الطلب؟
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", mt: 2, justifyContent: "center", gap: 3 }}>
          {cancelButton}
          {confirmButton}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeleteAlert;
