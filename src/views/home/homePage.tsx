import { Box, Card, CardContent } from "@mui/material";
import { Slide } from "./components/_index";
import { OrdersTable } from "../../components/tables/_index";
import { OrdersStatisticsSection, ServicesListSection } from "../../components/sections/_index";

const HomePage: React.FC = () => {
  return (
    <Box sx={{ minHeight: "60vh" }}>
      <Box sx={{ mt: { xs: "10vh", lg: "15vh" }, mb: "12vh", display: "flex", flexDirection: "column", gap: 3 }}>
        <OrdersStatisticsSection />
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "70%" }}>
            <Card>
              <CardContent>
                <OrdersTable isFullTable={false} />
              </CardContent>
            </Card>
            <ServicesListSection displayFullServices={false} />
          </Box>
          <Box sx={{ width: "30%" }}>
            <Slide />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
