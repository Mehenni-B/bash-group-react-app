import { Box, Container } from "@mui/material";
import { AuthCard } from './components/_index';
import { Login } from "./components/_index";
import RegisterOptions from "./components/register/RegisrtOptions";

const AuthPage: React.FC<{ action: 'login' | 'register' }> = ({ action }) => {
    return <>
        <Container>
            <Box sx={{ mt: { lg: '15vh' }, mb: { lg: '12vh' } }}>
                <AuthCard >
                    {action === "login" ? <Login /> : <RegisterOptions />}
                </AuthCard>
            </Box>
        </Container>
    </>;
}

export default AuthPage;