import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface StepTitleProps {
  title: string;
  style?: TypographyProps;
}

const StepTitle: React.FC<StepTitleProps> = ({ title, style }) => {
  return <>
    <Typography variant="h4" component="span" color="#272727" fontWeight="bold" fontSize="28px" {...style}>
      {title}
    </Typography>
  </>
};

export default StepTitle;