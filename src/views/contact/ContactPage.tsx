import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import {
    FacebookSVG,
    InstagramSVG,
    LinkedinSVG,
    WhatsappSVG,
 } from "../../assets/svg/_index";

interface ContactInfoProps {
    label: string;
    value: string;
}
const ContactInfo: React.FC<ContactInfoProps> = ({ label, value }) => {
    return (
        <Box sx={{ display: "flex", gap: 0.5 }}>
            <Typography variant="h6" sx={{ color: "#DE932E", fontWeight: "bold", lineHeight: 1, fontSize: "18px" }}>
                {label}
            </Typography>
            <Typography variant="body2" sx={{ color: "#272727", fontWeight: "500", lineHeight: 1, fontSize: "18px" }}>
                {value}
            </Typography>
        </Box>
    );
};

const ContactPage: React.FC = () => {
    return (
        <Container sx={{ minHeight: "60vh" }}>
            <Box sx={{ mt: { xs: "10vh", lg: "15vh" }, mb: "12vh", display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", padding: 3, backgroundColor: "#fff", minHeight: "70vh", borderRadius: 2, boxShadow: "0 5px 20px #33333315" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", lineHeight: 1, fontSize: "24px" }}>
                            معلومات التواصل
                        </Typography>
                        <ContactInfo label="معلومات التواصل:" value="info@bashammakh.sa" />
                        <ContactInfo label="رقم الواتساب الخاص بالدعم:" value="+966554632695" />
                        <Typography variant="h6" sx={{ color: "#DE932E", fontWeight: "bold", lineHeight: 1, fontSize: "18px" }}>
                            حساب وسائل التواصل الاجتماعي:
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <WhatsappSVG />
                            <InstagramSVG />
                            <FacebookSVG />
                            <LinkedinSVG />
                        </Box>
                    </Box>
                    <Button variant="contained" sx={{ py: 2, px: 15, fontSize: 14, fontWeight: 600, height: "max-content", borderRadius: 8 }}>
                        تواصل معنا
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ContactPage;
