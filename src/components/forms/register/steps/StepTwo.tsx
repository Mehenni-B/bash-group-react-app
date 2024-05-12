import { Alert, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { OTPField } from "../../../fields/_index";
import { Form } from "react-router-dom";
import * as yup from 'yup';
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import UserViewModel from "../../../../view-models/UserViewModel";

const validationSchema = yup.object({
    otp: yup.string().required("الرجاء إدخال الرمز.").min(6, 'يجب أن يحتوي الرمز على الأقل 6 أرقام.').max(6, 'يجب ألا يتجاوز الرمز 6 أرقام.'),
})

const StepTwo: React.FC<{ setActiveStep: (step: number) => void }> = ({ setActiveStep }) => {
    const registerData = useSelector((state: RootState) => state.user.registerData);
    const userViewModel = new UserViewModel();
    const getPhoneOtp = userViewModel.getPhoneOtp;
    const verifyPhoneOtp = userViewModel.verifyPhoneOtp;
    const phoneUUID = useSelector((state: RootState) => state.user.phoneUUID);
    const phoneErrorMessage = useSelector((state: RootState) => state.user.phoneErrorMessage);
    const [otpSent, setOtpSent] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        if (registerData) {
            const getOtp = async (phone: string) => await getPhoneOtp({ phone: phone });
            getOtp(registerData.phone);
            setOtpSent(true);
        }
    }, [registerData]);

    const onSubmitHandler = async (values: any) => {
        if (registerData && otpSent && phoneUUID) {
            const response = await verifyPhoneOtp({
                phone: registerData.phone,
                uuid: phoneUUID,
                otp: values.otp
            });
            console.log(response);
            if (response)
                setActiveStep(2)
        }
    }

    const resendOTP = async () => {
        setIsResending(true);
        if (registerData) {
            const response = await getPhoneOtp({ phone: registerData.phone });
            if (response === true) {
                setOtpSent(true);
                setTimer(60);
            }
        }
        setIsResending(false);
    }

    return <>
        <Typography sx={{ fontSize: 20 }}>
            لقد أرسلنا إليك رمز التحقق على رقم هاتف whatsapp الخاص بك
        </Typography>
        <Typography sx={{ fontSize: 20, color: 'secondary.main' }}>
            {registerData && registerData.phone}
        </Typography>
        <Typography sx={{ textAlign: 'left', mt: 4, mb: 2, fontSize: 20 }}>كود واتس اب</Typography>
        <Formik
            initialValues={{ otp: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {({ handleSubmit, isSubmitting, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    {phoneErrorMessage && <Alert severity='error'> {phoneErrorMessage}</Alert>}
                    <OTPField name="otp" setFieldValue={setFieldValue} setTimer={setTimer} setOtpSent={setOtpSent} timer={timer} otpSent={otpSent} isResending={isResending} resendOTP={resendOTP} />
                    <Button type="submit" variant="contained" sx={{ mt: 4, py: 2, px: 4, fontSize: 14, fontWeight: 600, borderRadius: 8 }} disabled={isSubmitting}>
                        {isSubmitting || isResending ? <CircularProgress /> : <>أرسل</>}
                    </Button>
                </Form>
            )}
        </Formik >
    </>
}

export default StepTwo;