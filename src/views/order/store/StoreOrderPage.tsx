import { Box, Container } from "@mui/material";
import { StoreOrderStepperForm } from "../../../components/forms/_index";

const StoreOrderPage: React.FC = () => {
  return (
    <Container sx={{ minHeight: '60vh' }}>
      <Box sx={{ mt: { xs: '10vh', lg: '15vh' }, mb: '20vh' }}>
        <StoreOrderStepperForm />
      </Box>
    </Container>
  );
};

export default StoreOrderPage;
