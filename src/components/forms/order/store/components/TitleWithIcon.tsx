import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { CgShapeRhombus } from "react-icons/cg";

interface TitleWithIconProps {
  value: string;
  fontWeight?: 'normal' | 'bold' | number;
  children?: ReactNode;
}

const TitleWithIcon: React.FC<TitleWithIconProps> = ({ value, fontWeight = 'normal', ...other }) => {
  return (
    <Box display="flex" alignItems="center" {...other}>
      <Box display="flex" alignItems="center" color="#f5a623">
        <CgShapeRhombus />
      </Box>
      <Typography variant="body1" component={"h3"} ml={1} fontSize={"18px"} fontWeight={fontWeight} {...other}>
        {value}
      </Typography>
    </Box>
  );
};

export default TitleWithIcon;