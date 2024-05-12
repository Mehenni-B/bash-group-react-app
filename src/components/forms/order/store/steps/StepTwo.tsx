import { Box, Grid } from "@mui/material";
import { StepTitle, Slide } from "../components/_index";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { OrderViewModel } from "../../../../../view-models/_index";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { FilesForm } from "../forms/_index";

const maxFileSize: number = 2 * 1024 * 1024; // 2 MB in bytes

const isValidFileSize = (value: any): boolean => {
  if (!value || !value[0] || !value[0].size) return true;
  return value[0].size <= maxFileSize;
};

const validationSchema = yup.object({
  file: yup.mixed().notRequired().test("fileSize", "حجم الملف يجب أن يكون أقل من 2MB", isValidFileSize),
  agreeTerms: yup.boolean().oneOf([true], "يجب الموافقة على الشروط والأحكام."),
  note: yup.string().notRequired(),
});

const StepTwo: React.FC<{ setActiveStep: (value: number) => void, activeStep: number }> = ({ setActiveStep, activeStep }) => {
  const saveOrder = (new OrderViewModel()).save;
  const selectedService = useSelector((state: RootState) => state.service.current);

  const onSubmitHandler = (values: any) => {
    console.log(values);
    if (selectedService) {
      const orderValues = {
        ...values,
        service_id: selectedService.id
      };
      saveOrder(orderValues);
      console.log('orderValues', orderValues);
      setActiveStep(2);
    }
  };

  return (
    <Formik
      initialValues={{ file: "", agreeTerms: false, note: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {({ handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Box mt={3}>
            <StepTitle title={"المستندات المطلوبة"} />
            <Grid container spacing={{ xs: 2, md: 4 }}>
              <Grid item xs={12} md={8}>
                <FilesForm setFieldValue={setFieldValue} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Slide setActiveStep={setActiveStep} activeStep={activeStep} />
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default StepTwo;
