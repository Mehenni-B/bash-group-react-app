import { Box, Container } from "@mui/material";
import { AdministrationsSelectSection, ServicesListSection } from "../../components/sections/_index";

const ServicesPage: React.FC = () => {
    return <>
        <Container sx={{ minHeight: '60vh' }}>
            <Box sx={{ mt: { xs: '10vh', lg: '15vh' }, mb: '12vh' }}>
                <Box sx={{ mb: 8 }}>
                    <AdministrationsSelectSection />
                </Box>
                <ServicesListSection cardMDGrid={3} />
            </Box>
        </Container>
    </>;
}

export default ServicesPage;