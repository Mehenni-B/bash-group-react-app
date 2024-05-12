import React from "react";
import { Box, Button, Typography } from "@mui/material";
import EmployeeIcon from '../../../../assets/employee-icon.png';
import ClientIcon from '../../../../assets/client-icon.png';
import { Register } from '../_index';

const RegisterOptions: React.FC = () => {
    const [showRegister, setShowRegister] = React.useState(false);
    return <>
        {showRegister ?
            <Register />
            : <>
                <Box>
                    <Typography variant="h1" color={'secondary'} sx={{ mt: 5, fontSize: 24, fontWeight: 600 }}>تسجيل الدخول</Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 400, mt: 4 }}>
                        اختر الدور الذي يناسبك وقم بتسجيل حساب جديد الآن
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 6 }}>
                        <Button>
                            <img src={EmployeeIcon} alt="Employee" style={{ width: '100%' }} />
                        </Button>
                        <Button onClick={() => {setShowRegister(true)}}>
                            <img src={ClientIcon} alt="Client" style={{ width: '100%' }} />
                        </Button>
                    </Box>
                </Box>
            </>}
    </>
}

export default RegisterOptions;