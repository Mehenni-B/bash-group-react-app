import React, { useState } from "react";
import { Box, Button,  Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Details,Slide,Conversation} from "./components/_index";
import {RightArrowSVG} from "../../../assets/svg/_index";

const OrderDetailsPage: React.FC = () => {
  const [openConversation, setOpenConversation] = useState(false);

  return (
    <Box sx={{ minHeight: "60vh" }}>
      <Box sx={{ mt: { xs: "10vh", lg: "15vh" }, mb: "12vh", display: "flex", flexDirection: "column", gap: 3 }}>
        <Link to={"/order/list"} style={{ width: "max-content" }}>
          <Button sx={{ display: "flex", alignItems: "center", gap: 1, background: "linear-gradient(270deg, #027FCF35 , #6FA4C825 )", borderRadius: 2, padding: "10px 30px" }}>
            <RightArrowSVG />
            <Typography sx={{ textDecoration: "none", color: "#0D77BC", "&:hover": { color: "#0D77BC" }, fontSize: "18px", fontWeight: "bold" }} variant="h6">
              العودة للطلبات
            </Typography>
          </Button>
        </Link>
        <Box mt={1} display={"flex"} gap={2}>
          <Details />
          <Box component="div" p={3} borderRadius={2} sx={{ backgroundColor: "#fff" }} boxShadow={"0 5px 20px #33333315"} display={"flex"} flexDirection={"column"} gap={1} minHeight={"30vh"} width={"30%"}>
            {openConversation ? <Conversation setOpenConversation={setOpenConversation} /> : <Slide setOpenConversation={setOpenConversation} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetailsPage;
