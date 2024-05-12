import { Box, Button, CircularProgress, } from "@mui/material";
import React from "react";
import { InputField, PhoneField, PasswordField, TermsCheckboxField } from "../../fields/_index";
import { Form, Formik } from "formik";
import * as yup from 'yup';
import UserViewModel from "../../../view-models/UserViewModel";

const validationSchema = yup.object({
    name: yup.string().required("الرجاء إدخال الاسم.").min(3, 'الاسم يجب أن يحتوي على الأقل 3 أحرف.').max(255, 'الاسم يجب ألا يتجاوز 255 حرفاً.'),
    phone: yup.string().required("الرجاء إدخال رقم الهاتف.").matches(/^[0-9+ ]+$/, "يجب أن يتكون رقم الهاتف من أرقام فقط.").min(6, 'رقم الهاتف يجب أن يحتوي على الأقل 6 أرقام.').max(20, 'رقم الهاتف يجب ألا يتجاوز 20 رقماً.'),
    email: yup.string().required("الرجاء إدخال البريد الإلكتروني.").email("البريد الإلكتروني غير صالح.").min(3, 'البريد الإلكتروني يجب أن يحتوي على الأقل 3 أحرف.').max(255, 'البريد الإلكتروني يجب ألا يتجاوز 255 حرفاً.'),
    password: yup.string().required("الرجاء إدخال كلمة المرور.").min(8, 'كلمة المرور يجب أن تحتوي على الأقل 8 أحرف.').max(255, 'كلمة المرور يجب ألا تتجاوز 255 حرفاً.'),
    password_confirmation: yup.string().required("الرجاء إدخال تأكيد كلمة المرور.").min(8, 'تأكيد كلمة المرور يجب أن تحتوي على الأقل 8 أحرف.').max(255, 'تأكيد كلمة المرور يجب ألا تتجاوز 255 حرفاً.'),
    tin_number: yup.string().required("الرجاء إدخال الرقم الضريبي.").min(3, 'الرقم الضريبي يجب أن يحتوي على الأقل 3 أحرف.').max(255, 'الرقم الضريبي يجب ألا يتجاوز 255 حرفاً.'),
});


const CompanyRegisterForm: React.FC<{ setActiveStep: (step: number) => void }> = ({ setActiveStep }) => {
    const [isTermsAccepted, setIsTermsAccepted] = React.useState(false);
    const validateRegisterData = (new UserViewModel()).validateRegisterData;
    const onSubmitHandler = async (values: any) => {
        values.user_type = 'company';
        values.company = {};
        values.company.tin_number = values.tin_number;
        const response = await validateRegisterData(values);
        if (response)
            setActiveStep(1);
    }

    return <>
        <Formik
            initialValues={{ name: '', tin_number: '', phone: '', email: '', password: '', password_confirmation: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {({ handleSubmit, isSubmitting, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Box>
                        <InputField name="name" placeholder="الاسم" autoFocus={true} />
                        <InputField name="tin_number" placeholder="الرقم الضريبي" />
                        <PhoneField name="phone" setFieldValue={setFieldValue} />
                        <InputField name="email" placeholder="name@email.com" />
                        <PasswordField name="password" placeholder="كلمة السر" />
                        <PasswordField name="password_confirmation" placeholder="تأكيد كلمة السر" />
                        <TermsCheckboxField name="terms" setValue={setIsTermsAccepted} />
                    </Box>
                    <Button type="submit" variant="contained" sx={{ mt: 4, py: 2, px: 4, fontSize: 14, fontWeight: 600, borderRadius: 8 }} disabled={isSubmitting || !isTermsAccepted}>
                        {isSubmitting ? <CircularProgress /> : <>أرسل</>}
                    </Button>
                </Form>
            )}
        </Formik>
    </>
}

export default CompanyRegisterForm;