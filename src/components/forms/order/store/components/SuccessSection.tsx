import React from "react";
import { Box, Typography } from "@mui/material";
import { CheckmarkDoneCircleSVG } from "../../../../../assets/svg/_index";

const SuccessSection: React.FC = () => {
  return (
    <Box
      component="div"
      p={3}
      mt={3}
      borderRadius={2}
      boxShadow={"0 5px 20px #33333315"}
      sx={{ backgroundColor: "#fff" }}
      justifyContent={"center"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      height={600}
      gap={2}
    >
      <Typography variant="h5" component="span" color={"#00BF4C"} fontWeight={"bold"} fontSize={"32px"}>
        تمت إضافة طلبك بنجاح
      </Typography>
      <CheckmarkDoneCircleSVG />
    </Box>
  );
};

export default SuccessSection;
