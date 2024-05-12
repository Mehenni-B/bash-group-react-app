import { Box, Button, CircularProgress, } from "@mui/material";
import React from "react";
import { InputField, PhoneField, PasswordField, TermsCheckboxField, SelectField, DatePickerField } from "../../fields/_index";
import { Form, Formik } from "formik";
import * as yup from 'yup';
import UserViewModel from "../../../view-models/UserViewModel";

const validationSchema = yup.object({
    name: yup.string().required("الرجاء إدخال الاسم.").min(3, 'الاسم يجب أن يحتوي على الأقل 3 أحرف.').max(255, 'الاسم يجب ألا يتجاوز 255 حرفاً.'),
    phone: yup.string().required("الرجاء إدخال رقم الهاتف.").matches(/^[0-9+ ]+$/, "يجب أن يتكون رقم الهاتف من أرقام فقط.").min(6, 'رقم الهاتف يجب أن يحتوي على الأقل 6 أرقام.').max(20, 'رقم الهاتف يجب ألا يتجاوز 20 رقماً.'),
    email: yup.string().required("الرجاء إدخال البريد الإلكتروني.").email("البريد الإلكتروني غير صالح.").min(3, 'البريد الإلكتروني يجب أن يحتوي على الأقل 3 أحرف.').max(255, 'البريد الإلكتروني يجب ألا يتجاوز 255 حرفاً.'),
    password: yup.string().required("الرجاء إدخال كلمة المرور.").min(8, 'كلمة المرور يجب أن تحتوي على الأقل 8 أحرف.').max(255, 'كلمة المرور يجب ألا تتجاوز 255 حرفاً.'),
    password_confirmation: yup.string().required("الرجاء إدخال تأكيد كلمة المرور.").min(8, 'تأكيد كلمة المرور يجب أن تحتوي على الأقل 8 أحرف.').max(255, 'تأكيد كلمة المرور يجب ألا تتجاوز 255 حرفاً.'),
    birth_date: yup.date().required("الرجاء إدخال يوم الميلاد."),
    gender: yup.string().required('الرجاء إدخال الجنس').oneOf(['M', 'F'], 'اختيار خاطئ'),
});

const genders = [
    {
        value: 'M',
        label: 'ذكر',
    },
    {
        value: 'F',
        label: 'أنثى',
    },
];

const currentDate = new Date();
const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

const IndividualRegisterForm: React.FC<{ setActiveStep: (step: number) => void }> = ({ setActiveStep }) => {
    const [isTermsAccepted, setIsTermsAccepted] = React.useState(false);
    const validateRegisterData = (new UserViewModel()).validateRegisterData;

    const onSubmitHandler = async (values: any) => {
        values.user_type = 'individual';
        values.individual = {};
        values.individual.birth_date = values.birth_date;
        values.individual.gender = values.gender;
        console.log(values);
        const response = await validateRegisterData(values);
        if (response)
            setActiveStep(1);
    }

    return <>
        <Formik
            initialValues={{ name: '', birth_date: '', gender: '', phone: '', email: '', password: '', password_confirmation: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {({ handleSubmit, isSubmitting, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Box>
                        <InputField name="name" placeholder="الاسم" autoFocus={true} />
                        <DatePickerField fieldName="birth_date" placeholder="يوم الميلاد" maxDate={maxDate} setFieldValue={setFieldValue} />
                        <SelectField name="gender" label="الجنس" options={genders} setFieldValue={setFieldValue} />
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

export default IndividualRegisterForm;