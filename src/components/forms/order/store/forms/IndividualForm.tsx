import { Card, CardContent, Grid, } from "@mui/material";
import React, { ReactNode } from "react";
import { InputField, PhoneField, SelectField, DatePickerField } from "../../../../fields/_index";
import { Form, Formik } from "formik";
import * as yup from 'yup';
import UserViewModel from "../../../../../view-models/UserViewModel";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import OrderViewModel from "../../../../../view-models/OrderViewModel";

const validationSchema = yup.object({
    name: yup.string().required("الرجاء إدخال الاسم.").min(3, 'الاسم يجب أن يحتوي على الأقل 3 أحرف.').max(255, 'الاسم يجب ألا يتجاوز 255 حرفاً.'),
    phone: yup.string().required("الرجاء إدخال رقم الهاتف.").matches(/^[0-9+ ]+$/, "يجب أن يتكون رقم الهاتف من أرقام فقط.").min(6, 'رقم الهاتف يجب أن يحتوي على الأقل 6 أرقام.').max(20, 'رقم الهاتف يجب ألا يتجاوز 20 رقماً.'),
    email: yup.string().required("الرجاء إدخال البريد الإلكتروني.").email("البريد الإلكتروني غير صالح.").min(3, 'البريد الإلكتروني يجب أن يحتوي على الأقل 3 أحرف.').max(255, 'البريد الإلكتروني يجب ألا يتجاوز 255 حرفاً.'),
    country: yup.string().required("الرجاء إدخال الاسم.").min(3, 'الاسم يجب أن يحتوي على الأقل 3 أحرف.').max(255, 'الاسم يجب ألا يتجاوز 255 حرفاً.'),
    city: yup.string().required("الرجاء إدخال الاسم.").min(3, 'الاسم يجب أن يحتوي على الأقل 3 أحرف.').max(255, 'الاسم يجب ألا يتجاوز 255 حرفاً.'),
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

const IndividualForm: React.FC<{ setActiveStep: (step: number) => void, children?: ReactNode }> = ({ setActiveStep, children }) => {
    const currenctUser = useSelector((state: RootState) => state.user.current);
    const order = useSelector((state: RootState) => state.order.current);
    const saveOrder = (new OrderViewModel()).save;

    const onSubmitHandler = async (values: any) => {
        if (order) {
            const UpdatedOrder = { ...order, ...values };
            saveOrder(UpdatedOrder);
            console.log(UpdatedOrder);
            setActiveStep(3);
        }
    }

    return <>
        <Formik
            initialValues={{ name: currenctUser?.name, birth_date: currenctUser?.individual?.birth_date, gender: currenctUser?.individual?.gender, phone: currenctUser?.phone, email: currenctUser?.email, country: '', city: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {({ handleSubmit, isSubmitting, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={{ xs: 2, md: 4 }}>
                        <Grid item xs={12} md={8}>
                            <Card sx={{ mt: 4, py: 4 }}>
                                <CardContent>
                                    <InputField name="name" placeholder="الاسم" autoFocus={true} />
                                    <DatePickerField fieldName="birth_date" placeholder="يوم الميلاد" maxDate={maxDate} setFieldValue={setFieldValue} />
                                    <SelectField name="gender" label="الجنس" options={genders} setFieldValue={setFieldValue} />
                                    <PhoneField name="phone" setFieldValue={setFieldValue} />
                                    <InputField name="email" placeholder="name@email.com" />
                                    <InputField name="country" placeholder="دولة" />
                                    <InputField name="city" placeholder="المدينة" />
                                </CardContent>
                            </Card >
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {children}
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik >
    </>
}

export default IndividualForm;