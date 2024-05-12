import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { StepTitle, Slide } from "../components/_index";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { IndividualForm, CompanyForm } from "../forms/_index";
import { UserViewModel } from "../../../../../view-models/_index";


const StepThree: React.FC<{ setActiveStep: (value: number) => void, activeStep: number }> = ({ setActiveStep, activeStep }) => {
  const currenctUser = useSelector((state: RootState) => state.user.current);
  const getCurrentUser = (new UserViewModel()).getCurrent;
  useEffect(() => {
    getCurrentUser();
  }, [])

  return (
    <>
      <Box mt={3}>
        <StepTitle title={"معلومات شخصية"} />
        {currenctUser && <>
          {(currenctUser.type === 'individual') ? <>
            <IndividualForm setActiveStep={setActiveStep}>
              <Slide setActiveStep={setActiveStep} activeStep={activeStep} />
            </ IndividualForm>
          </> : <>
            <CompanyForm setActiveStep={setActiveStep}>
              <Slide setActiveStep={setActiveStep} activeStep={activeStep} />
            </ CompanyForm>
          </>
          }
        </>
        }
      </Box>
    </>

  );
};

export default StepThree;
