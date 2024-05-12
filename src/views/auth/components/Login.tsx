import * as React from 'react';
import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import { LoginEmailForm, LoginPhoneForm } from '../../../components/forms/_index';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (<Box sx={{ p: 3 }}>{children}</Box>)}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Login: React.FC<{ state?: number }> = ({ state = 0 }) => {
    const [value, setValue] = React.useState(state);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return <>
        <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example" TabIndicatorProps={{ style: { display: 'none' } }}>
            <Tab icon={<PhoneIcon />} aria-label="Login with phone" {...a11yProps(0)} sx={{ backgroundColor: value === 0 ? '#e2eff7' : '#F7F7F7', borderRadius: 8, m: 1 }} />
            <Tab icon={<EmailIcon />} aria-label="login with Email" {...a11yProps(1)} sx={{ backgroundColor: value === 1 ? '#e2eff7' : '#F7F7F7', borderRadius: 8, m: 1 }} />
        </Tabs>
        <Container maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h2" sx={{ mt: 2, fontSize: 24, fontWeight: 600, color: 'secondary.main' }}>تسجيل الدخول</Typography>
                <Box sx={{ width: '100%', textAlign: 'left' }}>
                    <CustomTabPanel value={value} index={0}>
                        <LoginPhoneForm />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <LoginEmailForm />
                    </CustomTabPanel>
                    <Box sx={{ textAlign: 'center' }}>
                        <Link to={'/register'}>
                            <Button sx={{ fontSize: 16, fontWeight: 600, color: 'secondary.main' }}>تسجيل حساب جديد</Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    </>
}

export default Login;