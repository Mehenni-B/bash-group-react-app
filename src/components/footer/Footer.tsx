import { Box, Container, Divider, Grid, List, ListItem, ListItemText, styled, Typography } from '@mui/material';
import { LogoSM } from '../_index';

const BackgroundedFooter = styled('footer')({
    backgroundColor: '#1077BC',
    marginTop: '10vh',
});

const Footer: React.FC = () => {
    return (
        <BackgroundedFooter>
            <Container sx={{ color: 'primary.contrastText', py: 5 }}>
                <Grid container spacing={{ xs: 2, md: 4 }}>
                    <Grid item xs={12} sm={4}>
                        <LogoSM color="white" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Box>
                                <Typography variant='h3' sx={{ fontSize: 24, fontWeight: 600 }}>صفحاتنا</Typography>
                                <List>
                                    <ListItem sx={{ textAlign: 'left' }}>
                                        <ListItemText>صفحة الرئيسية</ListItemText>
                                    </ListItem>
                                    <ListItem sx={{ textAlign: 'left' }}>
                                        <ListItemText>خدماتنا</ListItemText>
                                    </ListItem>
                                    <ListItem sx={{ textAlign: 'left' }}>
                                        <ListItemText>خدماتنا</ListItemText>
                                    </ListItem>
                                    <ListItem sx={{ textAlign: 'left' }}>
                                        <ListItemText>خدماتنا</ListItemText>
                                    </ListItem>
                                </List>
                            </Box>
                            <Box>
                                <Typography variant='h3' sx={{ fontSize: 24, fontWeight: 600 }}>صفحاتنا</Typography>
                                <List>
                                    <ListItem sx={{ textAlign: 'left' }}>
                                        <ListItemText>صفحة الرئيسية</ListItemText>
                                    </ListItem>
                                    <ListItem sx={{ textAlign: 'left' }}>
                                        <ListItemText>خدماتنا</ListItemText>
                                    </ListItem>
                                    <ListItem sx={{ textAlign: 'left' }}>
                                        <ListItemText>خدماتنا</ListItemText>
                                    </ListItem>
                                    <ListItem sx={{ textAlign: 'left' }}>
                                        <ListItemText>خدماتنا</ListItemText>
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ mt: 4 }}>
                            <Typography variant='h3' sx={{ fontSize: 24, fontWeight: 600 }}>مواقعنا</Typography>
                            <List>
                                <ListItem sx={{ textAlign: 'left' }}>
                                    <ListItemText>
                                        القاهرة - مدينة نصر - شارع الطيران تقاطع شارع خضر التوني - برج 54 - الدور السادس - مكتب رقم 607
                                    </ListItemText>
                                </ListItem>
                                <ListItem sx={{ textAlign: 'left' }}>
                                    <ListItemText>
                                        جدة - طريق المدينة المنورة، طريق المدينة النازل - برج سلامة - الدور السابع مكتب رقم (709 - 710)
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>
                </Grid>
                <Divider sx={{ backgroundColor: 'white' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Typography>جميع الحقوق محفوظة ©</Typography>
                    <Typography>سياسة الخصوصية</Typography>
                </Box>
            </Container>
        </BackgroundedFooter>
    );
};

export default Footer;
