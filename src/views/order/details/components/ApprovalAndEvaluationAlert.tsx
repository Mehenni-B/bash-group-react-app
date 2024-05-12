import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Rating, Typography } from "@mui/material";

interface ApprovalAndEvaluationAlertProps {
    setOpen: (open: boolean) => void;
    open: boolean;
}
const ApprovalAndEvaluationAlert: React.FC<ApprovalAndEvaluationAlertProps> = ({
    setOpen,
    open,
}) => {
    const theme = useTheme();
    const [starValue1, setStarValue1] = useState<number>(0);
    const [starValue2, setStarValue2] = useState<number>(0);
    const [starValue3, setStarValue3] = useState<number>(0);
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const handleClose = () => {
        setOpen(false);
    };

    const buttonStyles = {
        padding: "1rem",
        width: "160px",
        height: "56px",
        fontSize: 16,
        fontWeight: 600,
        borderRadius: "500px",
        color: "#fff",
        boxShadow: "none",
        "&:hover": {
            boxShadow: "none",
        },
    };

    const cancelButtonStyles = {
        ...buttonStyles,
        background: "#1077BC",
        "&:hover": {
            ...buttonStyles["&:hover"],
            background: "#194867",
        },
    };

    const cancelButtonProps = {
        onClick: handleClose,
        sx: cancelButtonStyles,
        autoFocus: true,
    };

    const cancelButton = <Button {...cancelButtonProps}>تراجع</Button>;

    const confirmButtonStyles = {
        ...buttonStyles,
        background: "#3BC963",
        "&:hover": {
            ...buttonStyles["&:hover"],
            background: "#1f6131",
        },
    };

    const confirmButtonText = "الموافقة والتقييم";
    const confirmButtonOnClick = handleClose;

    const confirmButtonProps = {
        onClick: confirmButtonOnClick,
        sx: confirmButtonStyles,
    };

    const confirmButton = (
        <Button {...confirmButtonProps}>{confirmButtonText}</Button>
    );

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            sx={{ textAlign: "center" }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, padding: "1.5rem 6rem", alignItems: "center" }}>
                <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: "bold", color: "#272727", fontSize: "28px" }}>
                    {"الموافقة والتقييم"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: "#272727", fontSize: "18px", fontWeight: "500" }}>
                        قم بالموافقة على استلام هذا الطلب كما توقعته وقم بتقييم خدماتنا.
                    </DialogContentText>

                    <Box sx={{ display: "flex", gap: 1, width: "100%", flexDirection: "column", mt: 3 }}>
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                            <Rating
                                name="simple-controlled"
                                dir="rtl"
                                value={starValue1}
                                onChange={(event, newValue:any) => {
                                    setStarValue1(newValue);
                                }}
                            />
                            <Typography variant="body1" sx={{ color: "#272727", fontSize: "18px", fontWeight: "500" }} component="legend">
                                الخدمة
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                            <Rating
                                name="simple-controlled"
                                dir="rtl"
                                value={starValue2}
                                onChange={(event, newValue:any) => {
                                    setStarValue2(newValue);
                                }}
                            />
                            <Typography variant="body1" sx={{ color: "#272727", fontSize: "18px", fontWeight: "500" }} component="legend">
                                الموظف
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                            <Rating
                                name="simple-controlled"
                                dir="rtl"
                                value={starValue3}
                                onChange={(event, newValue:any) => {
                                    setStarValue3(newValue);
                                }}
                            />
                            <Typography variant="body1" sx={{ color: "#272727", fontSize: "18px", fontWeight: "500" }} component="legend">
                                المنصة
                            </Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: "flex", mt: 2, justifyContent: "center", gap: 3 }}>
                    {cancelButton}
                    {confirmButton}
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default ApprovalAndEvaluationAlert;
