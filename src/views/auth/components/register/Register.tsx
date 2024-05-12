import { Typography } from "@mui/material";
import React from "react";
import { RegisterStepperForm } from '../../../../components/forms/_index'

const Register: React.FC = () => {
    return <>
        <Typography variant="h2" sx={{ fontSize: 24, fontWeight: 600, color: 'secondary.main' }}>تسجيل الدخول</Typography>
        <RegisterStepperForm />
    </>
}

export default Register;