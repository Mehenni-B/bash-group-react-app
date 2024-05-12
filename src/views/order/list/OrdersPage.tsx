import { Box, Container } from "@mui/material";
import { OrdersStatisticsSection } from "../../../components/sections/_index";
import { OrdersTable } from "../../../components/tables/_index";

const OrdersPage: React.FC = () => {
    return (
        <Container sx={{ minHeight: "60vh" }}>
            <Box sx={{ mt: { xs: "10vh", lg: "15vh" }, mb: "12vh", display: "flex", flexDirection: "column", gap: 3 }}>
                <OrdersStatisticsSection />
                <OrdersTable />
            </Box>
        </Container>
    );
};

export default OrdersPage;
