import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ServiceCard, SelectServiceCard } from "../cards/_index";
import { AdministrationViewModel, ServiceViewModel } from "../../view-models/_index";

type ServicesListSectionType = {
    isSelectedCard?: boolean,
    displayFullServices?: boolean,
    cardMDGrid?: number
}

const ServicesListSection: React.FC<ServicesListSectionType> = ({ isSelectedCard = false, displayFullServices = true, cardMDGrid = 4 }) => {
    const [showAllServices, setShowAllServices] = useState(false);
    const getAdministrations = (new AdministrationViewModel()).getList;
    const getServices = (new ServiceViewModel()).getList;
    const services = useSelector((state: RootState) => state.service.list);
    const selectedAdministrationId = useSelector((state: RootState) => state.administration.currentId);

    useEffect(() => {
        const getAdministrationList = async () => await getAdministrations();
        getAdministrationList();
        getServices(selectedAdministrationId);
    }, [selectedAdministrationId]);

    return <>
        <Typography variant="h2" sx={{ my: 2, fontSize: 24, fontWeight: 600 }}>الخدمات</Typography>
        {
            services ? <>
                <Grid container spacing={{ xs: 2, md: 4 }}>
                    {(displayFullServices ? services.slice(0, showAllServices ? services.length : 12) : services.slice(0, showAllServices ? services.length : 3)).map((service) => <>{
                        isSelectedCard ? <>
                            <Grid item xs={12} md={cardMDGrid} key={service.id}>
                                <SelectServiceCard service={service} />
                            </Grid>
                        </> : <>
                            <Grid item xs={12} md={cardMDGrid} key={service.id}>
                                <ServiceCard service={service} />
                            </Grid>
                        </>
                    }</>)}
                    {!showAllServices && services.length > 12 && (
                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                            <Button variant="contained" sx={{ mt: 4, py: 2, px: 4, fontSize: 14, fontWeight: 700, borderRadius: 8 }} color="secondary" onClick={() => setShowAllServices(false)}>تحميل المزيد</Button>
                        </Grid>
                    )}
                    {services.length === 0 && (
                        <Box sx={{ textAlign: 'center', width: '100%', mt: 8 }}>
                            <Typography sx={{ fontSize: 24, fontWeight: 600, margin: 'auto', color: 'secondary.main' }}>لا توجد خدمات متاحة</Typography>
                        </Box>
                    )}
                </Grid>
            </> : <>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "20vh" }}>
                    <CircularProgress size={'6rem'} />
                </Box>
            </>
        }
    </>
}

export default ServicesListSection;