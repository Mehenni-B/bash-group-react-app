import { useEffect, useState } from 'react';
import { Button, Box, CircularProgress, Alert } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { LoginPhoneType } from '../../models/User';
import { OTPField, PhoneField } from '../fields/_index';
import { UserViewModel } from '../../view-models/_index';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    phone: yup.string().required("الرجاء إدخال رقم الهاتف.").matches(/^[0-9+ ]+$/, "يجب أن يتكون رقم الهاتف من أرقام فقط.").min(6, 'رقم الهاتف يجب أن يحتوي على الأقل 6 أرقام.').max(20, 'رقم الهاتف يجب ألا يتجاوز 20 رقماً.'),
})

const LoginPhoneForm: React.FC = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [phone, setPhone] = useState('');
    const [uuid, setUuid] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timer, setTimer] = useState(60);
    const userViewModel = new UserViewModel();
    const getPhoneOtp = userViewModel.getPhoneOtp;
    const loginWithPhone = userViewModel.loginWithPhone;
    const phoneUUID = useSelector((state: RootState) => state.user.phoneUUID);
    const phoneErrorMessage = useSelector((state: RootState) => state.user.phoneErrorMessage);
    const navigate = useNavigate();

    useEffect(() => {
        if (phoneUUID)
            setUuid(phoneUUID)
    }, [phoneUUID])

    const onSubmitHandler = async (values: LoginPhoneType) => {
        if (otpSent) {
            const response = await loginWithPhone({ phone: values.phone, otp: values.otp, uuid: uuid });
            if (response === true)
                navigate('/', { replace: true });
        } else {
            resendOTP();
        }
    }

    const resendOTP = async () => {
        console.log('resendOTP()');
        console.log(phone);
        setIsSubmitting(true);
        if(phone){
            const response = await getPhoneOtp({ phone: phone });
            if (response === true) {
                setOtpSent(true);
                setShowOtpInput(true);
                setTimer(60);
            }
        }
        setIsSubmitting(false);
    }
    return (
        <>
            <Formik
                initialValues={{ phone: '', otp: '', uuid: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {({ handleSubmit, setFieldValue }) => (
                    <Form onSubmit={handleSubmit}>
                        {phoneErrorMessage && <Alert severity='error'> {phoneErrorMessage}</Alert>}
                        <PhoneField label="رقم واتس اب" name="phone" autoFocus={true} setFieldValue={setFieldValue} setValue={setPhone} />
                        {showOtpInput ?
                            <>
                                <OTPField name="otp" setFieldValue={setFieldValue} setTimer={setTimer} setOtpSent={setOtpSent} timer={timer} otpSent={otpSent} isResending={isSubmitting} resendOTP={resendOTP} />
                                <Box sx={{ textAlign: 'center' }}>
                                    <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ mt: 4, py: 2, px: 4, fontSize: 14, fontWeight: 600, borderRadius: 8 }}>
                                        {isSubmitting ? <CircularProgress /> : <> التحقق </>}
                                    </Button>
                                </Box>
                            </> : <>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ mt: 4, py: 2, px: 4, fontSize: 14, fontWeight: 600, borderRadius: 8 }}>
                                        {isSubmitting ? <CircularProgress /> : <> أرسل الكود </>}
                                    </Button>
                                </Box>
                            </>}
                    </Form>
                )}
            </Formik >
        </>
    );
}

export default LoginPhoneForm;
