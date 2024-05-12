import { Box, Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { ServiceType } from "../../models/Service";
import { UserSettingsSVG } from "../../assets/svg/_index";
import { useState } from "react";
import { ServiceDetailsModal } from "../modals/_index";
import { ServiceViewModel } from "../../view-models/_index";

const ServiceCard: React.FC<{ service: ServiceType }> = ({ service }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const getServiceDetails = (new ServiceViewModel()).getDetails;
    const handleOpen = async () => {
        setIsLoading(true);
        const response = await getServiceDetails(service.id);
        if (response)
            setOpen(true)
        setIsLoading(false);
    };

    return <>{
        isLoading ? <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                <CircularProgress size={'4rem'} />
            </Box>
        </> : <>
            <Button onClick={handleOpen} sx={{ p: 0, width: '100%', textAlign: 'start' }}>
                <Card sx={{ py: 0, height: '200px', width: '100%' }}>
                    <CardContent>
                        <UserSettingsSVG />
                        <Typography variant="h2" sx={{ mt: 2, fontSize: 18, fontWeight: 600 }}>{service.name_ar}</Typography>
                        <Typography sx={{ mt: 2, fontSize: 14, fontWeight: 400, }}>{service.administration_name_ar}</Typography>
                    </CardContent>
                </Card >
            </Button>
            <ServiceDetailsModal open={open} setOpen={setOpen} />
        </>
    }
    </>
}

export default ServiceCard;