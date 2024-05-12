import React from 'react';
import { useState } from 'react';
import { Button, Box, CircularProgress, Link, Alert } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { LoginEmailType } from '../../models/User';
import { InputField, PasswordField } from '../fields/_index';
import { UserViewModel } from '../../view-models/_index';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    email: yup.string().email("صيغة البريد الإلكتروني غير صالحة").required("الرجاء إدخال البريد الإلكتروني."),
    password: yup.string().required("الرجاء إدخال كلمة المرور."),
})

const LoginEmailForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const loginWithEmail = (new UserViewModel()).loginWithEmail;
    const navigate = useNavigate();

    const onSubmitHandler = async (values: LoginEmailType) => {
        setIsLoading(true);
        const response = await loginWithEmail(values);
        if (response === true) {
            setIsLoading(false);
            navigate('/', { replace: true });
        } else
            setIsLoading(false);
    }
    const emailErrorMessage = useSelector((state: RootState) => state.user.emailErrorMessage);

    return (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values: LoginEmailType, { setSubmitting }: FormikHelpers<LoginEmailType>) => {
                    setTimeout(() => {
                        onSubmitHandler(values);
                        setSubmitting(false);
                    }, 500);
                }}
            >
                <Form>
                    {emailErrorMessage && <Alert severity='error'> {emailErrorMessage}</Alert>}
                    <InputField label="البريد الإلكتروني" name="email" placeholder="name@email.com" autoFocus={true} />
                    <PasswordField label="كلمة السر" name="password" placeholder="--- --- ----" />
                    <Box sx={{ mt: 2 }}>
                        <Link sx={{ mt: 4, fontSize: 16, fontWeight: 600, color: 'secondary.main' }} underline="none">نسيت كلمة المرور؟</Link>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 4, py: 2, px: 4, fontSize: 14, fontWeight: 600, borderRadius: 8 }}
                        >
                            {isLoading ? <CircularProgress /> : <>تسجيل الدخول</>}
                        </Button>
                    </Box>
                </Form>
            </Formik>
        </>
    );
}

export default LoginEmailForm;