import { Card, CardContent, Grid, } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import { InputField, PhoneField } from "../../../../fields/_index";
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
    tin_number: yup.string().required("الرجاء إدخال الرقم الضريبي.").min(3, 'الرقم الضريبي يجب أن يحتوي على الأقل 3 أحرف.').max(255, 'الرقم الضريبي يجب ألا يتجاوز 255 حرفاً.'),
});


const CompanyForm: React.FC<{ setActiveStep: (step: number) => void, children: ReactNode }> = ({ setActiveStep, children }) => {
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
            initialValues={{ name: currenctUser?.name, tin_number: currenctUser?.company?.tin_number, phone: currenctUser?.phone, email: currenctUser?.email, country: '', city: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={{ xs: 2, md: 4 }}>
                        <Grid item xs={12} md={8}>
                            <Card sx={{ mt: 4, py: 4 }}>
                                <CardContent>
                                    <InputField name="name" placeholder="الاسم" label="الاسم" autoFocus={true} />
                                    <InputField name="tin_number" placeholder="الرقم الضريبي" label="الرقم الضريبي" />
                                    <PhoneField name="phone" setFieldValue={setFieldValue} label="رقم واتس اب" />
                                    <InputField name="email" placeholder="name@email.com" label="البريد الإلكتروني" />
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

export default CompanyForm;