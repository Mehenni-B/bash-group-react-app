import { Box, Typography } from "@mui/material";
import IntersectSVG from "../../assets/svg/IntersectSVG";

type OrderStatisticCardType = {
    title: string;
    value: number;
    background: string;
    color: string;
}

const OrderStatisticCard: React.FC<OrderStatisticCardType> = ({ title, value, background, color }) => (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "1em 1.5em", background: background, position: "relative", borderRadius: 2, color: color, flex: 1 }}>
        <Typography variant="h2" sx={{ width: "100%", fontWeight: "bold", color: "#000", fontSize: "24px" }}>{title}</Typography>
        <Typography variant="h2" sx={{ fontSize: "55px", width: "100%", fontWeight: "bold", textAlign: "right", margin: 0, lineHeight: 1 }}>{value}</Typography>
        <Box sx={{ position: "absolute", bottom: 0, display: "flex", left: "2rem", fill: color }}>
            <IntersectSVG />
        </Box>
    </Box>
);

export default OrderStatisticCard;