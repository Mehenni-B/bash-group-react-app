import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { StepOne, StepThree, StepTwo } from "./steps/_index";


const RegisterStepperForm: React.FC = () => {
    const [activeStep, setActiveStep] = React.useState(0);


    const steps = [1, 2, 3];
    return <>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 4 }}>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>

        <Box sx={{ mt: 4, pl: 2 }}>
            {activeStep === 0 && <StepOne setActiveStep={setActiveStep} />}
            {activeStep === 1 && <StepTwo setActiveStep={setActiveStep} />}
            {activeStep === 2 && <StepThree setActiveStep={setActiveStep} />}
        </Box >
    </>
}

export default RegisterStepperForm;