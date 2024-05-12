import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import "../../../../styles/request.css";
import { TabPanel } from "./components/_index";
import { StepOne, StepTwo, StepThree, StepFour } from "./steps/_index";
import PaymentForm from "../../PaymentForm";

interface Step {
  label: string;
  component: React.ComponentType<{ setActiveStep: React.Dispatch<React.SetStateAction<number>>, activeStep: number }>;
}

const steps: Step[] = [
  { label: "اختيار الخدمة", component: StepOne as React.ComponentType<{ setActiveStep: React.Dispatch<React.SetStateAction<number>>, activeStep: number }> },
  { label: "المتطلبات والشروط", component: StepTwo as React.ComponentType<{ setActiveStep: React.Dispatch<React.SetStateAction<number>>, activeStep: number }> },
  { label: "معلومات شخصية", component: StepThree as React.ComponentType<{ setActiveStep: React.Dispatch<React.SetStateAction<number>>, activeStep: number }> },
  { label: "التحقق والتأكيد", component: StepFour as React.ComponentType<{ setActiveStep: React.Dispatch<React.SetStateAction<number>>, activeStep: number }> },
  { label: "نجاح", component: PaymentForm },
];

const renderTab = (label: string, activeStep: number, index: number) => {
  if (index === steps.length - 1) {
    return null;
  }

  return (
    <Tab
      key={index}
      label={label}
      disabled={activeStep < index}
      sx={{
        "&.Mui-selected": {
          color: "#f5a623",
          borderBottom: "3px solid #f5a623",
        },
        color: (activeStep >= index) ? "#1077BC" : "#f5a623",
        fontWeight: "bold",
        fontSize: "20px",
        padding: "0 20px",
        whiteSpace: "nowrap",
        marginRight: "2vw",
        marginLeft: "2vw",
        borderBottom: "3px solid",
        flex: 1,
        pointerEvents: activeStep === 4 ? "none" : "auto",
      }}
    />
  );
};

const StoreOrderStepperForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveStep(newValue);
  };

  return <>
    <Box>
      <Box sx={{ justifyContent: "center", display: "flex", alignItems: "center", width: "100%" }}>
        {activeStep < 4 && <>
          <Tabs
            sx={{ "& .MuiTabs-indicator": { display: "none" }, width: "100%", height: "100%" }}
            value={activeStep === 4 ? false : activeStep}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{ className: "tabIndicator" }}
          >
            {steps.map((step, index) => renderTab(step.label, activeStep, index))}
          </Tabs>
        </>
        }

      </Box>

      {steps.map((step, index) => (
        <TabPanel key={index} value={activeStep} index={index}>
          <step.component setActiveStep={setActiveStep} activeStep={activeStep} />
        </TabPanel>
      ))}
    </Box>
  </>
};

export default StoreOrderStepperForm;
