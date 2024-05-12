import { Box, Button, Container, Grid, Modal, Typography } from "@mui/material";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const testDescription = "تمتع بأفضل إدارة لموارد شركتك البشرية في السعودية مع مجموعة باشماخ لخدمات الأعمالتمتع بأفضل إدارة لموارد شركتك البشرية في السعودية مع مجموعة باشماخ لخدمات الأعمالتمتع بأفضل إدارة لموارد شركتك البشرية في السعودية مع مجموعة باشماخ لخدمات الأعمال";
const test2 = " تمتع بأفضل إدارة لموارد شركتك البشرية في السعودية مع مجموعة باشماخ لخدمات الأعمال تمتع بأفضل إدارة لموارد شركتك البشرية في السعودية مع مجموعة باشماخ لخدمات الأعمال";

const ServiceDetailsModal: React.FC<{ open: boolean, setOpen: (open: boolean) => void }> = ({ open, setOpen }) => {
    const handleClose = () => setOpen(false);
    const service = useSelector((state: RootState) => state.service.current);
    return <>
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...style }}>
                <div dir="rtl">
                    <Container maxWidth="xl">
                        <Grid container sx={{ pb: 4 }} spacing={{ xs: 2, md: 4 }}>
                            <Grid item xs={12} md={7}>
                                <Typography component="h2" sx={{ mt: 2, fontSize: 28, fontWeight: 800 }}>{service?.name_ar}</Typography>
                                <Typography sx={{ mt: 2, fontSize: 22, fontWeight: 500, }}>{service?.administration_name_ar}</Typography>
                                <Typography sx={{ my: 2, fontSize: 18, fontWeight: 400, }}>{service?.description_ar ? service?.description_ar : <>{testDescription} <br /> {test2}</>}</Typography>
                                <Grid container spacing={{ xs: 2, md: 4 }}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography component="h3" sx={{ mt: 2, fontSize: 22, fontWeight: 700 }}>المستندات المطلوبة</Typography>
                                        {service?.docs?.map((doc, index) => (
                                            <Typography key={index} sx={{ mt: 1, fontSize: 18, fontWeight: 400 }}><Icon /> {doc.name_ar}</Typography>

                                        ))}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography component="h3" sx={{ mt: 2, fontSize: 22, fontWeight: 700 }}>شروط الخدمة</Typography>
                                        {service?.conditions?.map((condition, index) => (
                                            <Typography key={index} sx={{ mt: 1, fontSize: 18, fontWeight: 400 }}><Icon /> {condition.name_ar}</Typography>

                                        ))}
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 4 }}>
                                    <Typography component="h3" sx={{ fontSize: 22, fontWeight: 700 }}>الملاحظات</Typography>
                                    {service?.notes?.map((note, index) => (
                                        <Typography key={index} sx={{ mt: 1, fontSize: 18, fontWeight: 400 }}><Icon /> {note.name_ar}</Typography>

                                    ))}
                                </Box>
                                <Box sx={{ mt: 4 }}>
                                    <Typography component="h3" sx={{ fontSize: 22, fontWeight: 700 }}>معلومات حول الخدمة</Typography>
                                    <Grid container>
                                        <Grid item xs={12} sm={6}>
                                            <Typography sx={{ mt: 1, fontSize: 18, fontWeight: 700 }}><Icon /> الأتعاب : {service?.fees} ريال</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography component="h3" sx={{ mt: 1, fontSize: 18, fontWeight: 700 }}><Icon /> مدة تنفيذ الخدمة : {service?.execution_days} أيام</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography component="h3" sx={{ mt: 1, fontSize: 18, fontWeight: 700 }}><Icon /> الضريبة : {service?.tax} %</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography component="h3" sx={{ mt: 1, fontSize: 18, fontWeight: 700 }}><Icon /> الرسوم الحكومية : {service?.government_fees} ريال</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Box sx={{ pt: 0, mt: 0, textAlign: 'center', height: { sx: 0, md: '90%' } }}>
                                </Box>
                                <Box sx={{ textAlign: 'center', mb: 4 }}>
                                    {/* <Button variant="contained" sx={{ mx: 1, mt: 4, py: 2, px: 4, fontSize: 18, fontWeight: 700, borderRadius: 8 }} color="error">معلومات اكثر</Button> */}
                                    <Link to={'/order/store'}>
                                        <Button variant="contained" sx={{ mx: 1, mt: 4, py: 2, px: 4, fontSize: 18, fontWeight: 700, borderRadius: 8 }} color="secondary">اطلب الان</Button>
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Box>
        </Modal >
    </>
}

const Icon = () => {
    return <>
        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="8" width="10" height="10" transform="rotate(-45 0 8)" fill="#DF932D" />
        </svg>

    </>
}
export default ServiceDetailsModal;