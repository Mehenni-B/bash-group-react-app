import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { ReactNode } from "react";
import { StampSVG, LogoSVG } from '../../../assets/svg/_index';

const ColoredText = styled('span')({
    color: '#DF932D',
});

const AuthCard: React.FC<{ children?: ReactNode }> = ({ children }) => {
    return <>
        <Card sx={{ mx: { xs: 0, lg: 12 }, mt: { xs: 0, lg: 4 }, mb: 4 }}>
            <CardContent>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ p: 4, textAlign: 'center' }}>
                    <Grid item xs={12} md={6} sx={{ p: 4, mt: { xs: 4, md: 0 } }}>
                        {children}
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ mr: "-1px", display: { xs: 'none', md: 'block' } }} />
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Box sx={{ my: 6 }}>
                                <LogoSVG width="100%" height="120" />
                            </Box>
                            <Box sx={{ my: 6 }}>
                                <StampSVG width="100%" height="120" />
                            </Box>
                            <Typography sx={{ display: 'flow', fontSize: 16, fontWeight: 500, textAlign: 'center' }}>
                                منذ عام 1991م، نجحنا في تقديم أفضل خدمات الأعمال لنخبة من الشركات المحلية والعالمية في المملكة، وبفضل سمعتنا الطيبة ومصداقيتنا العالية،
                                <ColoredText color={'secondary'}>
                                    &nbsp;قم بتسجيل الدخول إلى حسابك الآن&nbsp;
                                </ColoredText>
                                ونحن على استعداد تام لخدمتك.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    </>
}

export default AuthCard;