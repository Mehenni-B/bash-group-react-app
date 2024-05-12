import { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const MyComponent: React.FC = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const toastData = useSelector((state: RootState) => state.toast.value);
    const toastIndex = useSelector((state: RootState) => state.toast.index);

    useEffect(() => {
        if (toastData)
            setOpenSnackbar(true);
    }, [toastIndex]);

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                title={toastData?.title}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={toastData?.status}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {toastData?.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default MyComponent;
