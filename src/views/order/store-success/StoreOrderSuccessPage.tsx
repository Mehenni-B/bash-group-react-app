import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { CheckmarkDoneCircleSVG } from "../../../assets/svg/_index";

const StoreOrderSuccessPage: React.FC = () => {
    return <>
        <Card sx={{ mt: 16 ,boxShadow:"0 0 10px #33333315"}}>
            <CardContent>
                <Box sx={{ p: 3, justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", height: 600, gap: 2 }}>
                    <Typography variant="h5" component="span" color={"#00BF4C"} fontWeight={"bold"} fontSize={"32px"}>
                        تمت إضافة طلبك بنجاح
                    </Typography>
                    <CheckmarkDoneCircleSVG />
                </Box>
            </CardContent>
        </Card>
    </>;
};

export default StoreOrderSuccessPage;
