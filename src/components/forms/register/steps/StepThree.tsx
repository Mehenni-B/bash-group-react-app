import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Link } from "react-router-dom";
import * as yup from 'yup';
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import UserViewModel from "../../../../view-models/UserViewModel";
import { OTPField } from "../../../fields/_index";

const validationSchema = yup.object({
    otp: yup.string().required("الرجاء إدخال الرمز.").min(6, 'يجب أن يحتوي الرمز على الأقل 6 أرقام.').max(6, 'يجب ألا يتجاوز الرمز 6 أرقام.'),
})

const StepThree: React.FC<{ setActiveStep: (step: number) => void }> = ({ setActiveStep }) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const registerData = useSelector((state: RootState) => state.user.registerData);
    const userViewModel = new UserViewModel();
    const getEmailOtp = userViewModel.getEmailOtp;
    const verifyEmailOtp = userViewModel.verifyEmailOtp;
    const register = userViewModel.register;
    const emailUUID = useSelector((state: RootState) => state.user.emailUUID);
    const phoneUUID = useSelector((state: RootState) => state.user.phoneUUID);
    const emailErrorMessage = useSelector((state: RootState) => state.user.emailErrorMessage);
    const registerErrorMessage = useSelector((state: RootState) => state.user.registerErrorMessage);
    const [otpSent, setOtpSent] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        if (registerData) {
            const getOtp = async (email: string) => await getEmailOtp({ email: email });
            getOtp(registerData.email);
            setOtpSent(true);
        }
    }, [registerData]);

    const onSubmitHandler = async (values: any) => {
        if (registerData && emailUUID) {
            const response = await verifyEmailOtp({
                email: registerData.email,
                uuid: emailUUID,
                otp: values.otp
            });
            console.log(response);
            if (response) {
                const tempRegisterData = JSON.parse(JSON.stringify(registerData));
                tempRegisterData.phone_uuid = phoneUUID;
                tempRegisterData.email_uuid = emailUUID;
                console.log('tempRegisterData', tempRegisterData);
                const registerResponse = await register(tempRegisterData);
                if (registerResponse)
                    setFormSubmitted(true)
            }
        }
    }

    const resendOTP = async () => {
        setIsResending(true);
        if (registerData) {
            const response = await getEmailOtp({ email: registerData.email });
            if (response === true) {
                setOtpSent(true);
                setTimer(60);
            }
        }
        setIsResending(false);
    }

    return <>
        <Box sx={{ mt: 4, pl: 2 }}>
            {
                !formSubmitted ? <>
                    <Typography sx={{ fontSize: 20 }}>
                        لقد أرسلنا إليك رمز التحقق على البريد الإلكتروني الخاص بك
                    </Typography>
                    <Typography sx={{ fontSize: 20, color: 'secondary.main' }}>
                        {registerData && registerData.email}
                    </Typography>
                    <Typography sx={{ textAlign: 'left', mt: 4, mb: 2, fontSize: 20 }}>كود البريد الإلكتروني</Typography>
                    <Formik
                        initialValues={{ otp: '' }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmitHandler}
                    >
                        {({ handleSubmit, isSubmitting, setFieldValue }) => (
                            <Form onSubmit={handleSubmit}>
                                {registerErrorMessage && <Alert severity='error'> {registerErrorMessage}</Alert>}
                                {emailErrorMessage && <Alert severity='error'> {emailErrorMessage}</Alert>}
                                <OTPField name="otp" setFieldValue={setFieldValue} setTimer={setTimer} setOtpSent={setOtpSent} timer={timer} otpSent={otpSent} isResending={isResending} resendOTP={resendOTP} />
                                <Button type="submit" variant="contained" sx={{ mt: 4, py: 2, px: 4, fontSize: 14, fontWeight: 600, borderRadius: 8 }} disabled={isSubmitting}>
                                    {isSubmitting || isResending ? <CircularProgress /> : <>أرسل</>}
                                </Button>
                            </Form>
                        )}
                    </Formik >
                </> : <>
                    <svg width="144" height="144" viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M126 72C126 42.1875 101.812 18 72 18C42.1875 18 18 42.1875 18 72C18 101.812 42.1875 126 72 126C101.812 126 126 101.812 126 72Z" stroke="#00BF4C" strokeWidth="5" stroke-miterlimit="10" />
                        <path d="M103.5 54L72.0366 90L58.5506 76.5M53.9859 90L40.5 76.5M85.9809 54L71.4825 70.5938" stroke="#00BF4C" strokeWidth="5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <Typography sx={{ mt: 4, fontSize: 20 }}>تم إنشاء حسابك بنجاح</Typography>
                    <Link to="/login">
                        <Button type="submit" variant="contained" sx={{ mt: 4, py: 2, px: 4, fontSize: 14, fontWeight: 600, borderRadius: 8, backgroundColor: 'secondary.main' }}>تسجيل الدخول</Button>
                    </Link>
                </>
            }
        </Box >

    </>
}

export default StepThree;