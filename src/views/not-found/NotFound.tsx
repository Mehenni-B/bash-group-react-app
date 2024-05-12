import React from 'react';
import { Typography, Container } from '@mui/material';
import { ReactComponent as NotFoundImage } from './not_found.svg';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                404 الصفحة غير موجودة
            </Typography>
            <Link to="/">
                <Typography variant="h6" sx={{ color:"peru", textDecorationLine:"underline" }}>
                    العودة إلى الصفحة الرئيسية
                </Typography>
            </Link>
        </Container>
    );
}

export default NotFound;
