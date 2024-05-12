import { Box, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { Slide } from "../components/_index";
import { AdministrationsSelectSection, ServicesListSection } from "../../../../sections/_index";

const StepOne: React.FC<{ setActiveStep: (value: number) => void, activeStep: number }> = ({ setActiveStep, activeStep }) => {
  return <>
    <Formik initialValues={{}} onSubmit={() => setActiveStep(1)}>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} md={8}>
              <Box sx={{ my: 3, width: "70%" }}>
                <AdministrationsSelectSection />
              </Box>
              <ServicesListSection isSelectedCard={true} />
            </Grid>
            <Grid item xs={12} md={4} sx={{ mt: 4 }}>
              <Slide setActiveStep={setActiveStep} activeStep={activeStep} />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  </>;
};

export default StepOne;
