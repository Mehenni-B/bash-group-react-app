import React from "react";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <Box
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ position: "relative", zIndex: 1 }}
      {...other}
    >
      {value === index && <Box className={"tabPanel"}>{children}</Box>}
    </Box>
  );
};

export default TabPanel;
