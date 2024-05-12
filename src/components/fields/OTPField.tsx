import { ErrorMessage, useField } from 'formik';
import { Box, Button, FormControl, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useEffect } from 'react';

interface FieldProps {
    label?: string;
    name: string;
    width?: string;
    autoFocus?: boolean;
    isResending?: boolean;
    otpSent?: boolean;
    timer?: number;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
    setTimer?: React.Dispatch<React.SetStateAction<number>>;
    setOtpSent?: React.Dispatch<React.SetStateAction<boolean>>;
    resendOTP?: () => void;
}

const StyledErrorMessage = styled(ErrorMessage)`
  color: #f00;
  margin-top: 5px;
  font-size: 14px;
  padding-left: 7px;
`;

const OTPField: React.FC<FieldProps> = ({ label, name, autoFocus = false, width = "100%", setFieldValue, setTimer, setOtpSent, otpSent, timer, isResending, resendOTP }) => {
    const [field, meta] = useField(name);

    const handlResending = () => {
        if (setOtpSent)
            setOtpSent(false);
        if (resendOTP)
            resendOTP();
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (otpSent && setTimer) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        clearInterval(interval);
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [otpSent]);

    return (
        <>
            <FormControl id={name} sx={{ mt: 2, width: width, px: 1 }} variant="outlined">
                {label && <Typography sx={{ mb: 2, fontSize: 14, fontWeight: 600 }}>{label}</Typography>}
                <MuiOtpInput
                    width={'100%'}
                    gap={1}
                    {...field}
                    autoFocus={autoFocus}
                    value={field.value}
                    length={6}
                    onChange={(otp) => {
                        if (setFieldValue) {
                            setFieldValue(name, otp);
                        }
                    }}
                />
                {meta.touched && meta.error && <StyledErrorMessage name={field.name} component="div" />}
            </FormControl>
            {
                setOtpSent && <>
                    {timer && timer > 0 ?
                        <>
                            <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
                                <span>{`يمكنك إعادة طلب الرمز بعد: ${timer} ثانية`}</span>
                            </Box>
                        </> : <>
                            <Box sx={{ textAlign: 'center' }}>
                                <Button type="button" variant="outlined" sx={{ mt: 2, py: 1, px: 3, fontSize: 14, fontWeight: 600, borderRadius: 8 }}
                                    onClick={handlResending} disabled={isResending}
                                >
                                    إعادة إرسال الكود
                                </Button>
                            </Box>
                        </>
                    }
                </>
            }

        </>
    );
};

export default OTPField;