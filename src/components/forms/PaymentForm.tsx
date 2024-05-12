import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const PaymentForm: React.FC = () => {
    const orderPaymentId = useSelector((state: RootState) => state.order.paymentId)
    const [isLoading, setIsLoading] = useState(true);

    const renderPaymentForm = () => {
        if (orderPaymentId) {
            const paymentCard = document.getElementById("payment-card");

            // Load payment widget script
            const script = document.createElement("script");
            script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${orderPaymentId}`;
            script.async = true;
            document.body.appendChild(script);

            // Create and append the form
            const form = document.createElement("form");
            form.action = `${window.location.origin}/order/store/success`;
            console.log(window.location.origin)
            form.className = "paymentWidgets";
            form.setAttribute("data-brands", "AMEX MADA MASTER VISA");
            setIsLoading(false);
            paymentCard!.appendChild(form);
        }
    };

    useEffect(() => {
        renderPaymentForm();
    }, [orderPaymentId]);

    return (
        <div id="payment-card">
            {isLoading && <>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh">
                    <CircularProgress size={'6rem'} />
                </Box>
            </>}
        </div>
    );
};

export default PaymentForm;
