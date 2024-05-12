import { useState } from 'react';
import { ErrorMessage, useField } from 'formik';
import { FormControl, OutlinedInput, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from '@emotion/styled';

interface FieldProps {
    label?: string;
    name: string;
    placeholder?: string;
    width?: string;
    autoFocus?: boolean;
}

const StyledErrorMessage = styled(ErrorMessage)`
  color: #f00;
  margin-top: 5px;
  font-size: 14px;
  padding-left: 7px;
`;

const PasswordField: React.FC<FieldProps> = ({ label, name, placeholder = '', autoFocus = false, width = "100%" }) => {
    const [field, meta] = useField(name);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl id={name} sx={{ mt: 2, width: width, px: 1 }} variant="outlined">
            {label && <Typography sx={{ mb: 2, fontSize: 14, fontWeight: 600 }}>{label}</Typography>}
            <OutlinedInput
                fullWidth
                {...field}
                placeholder={placeholder}
                autoFocus={autoFocus}
                error={meta.touched && !!meta.error}
                inputProps={{
                    'aria-label': 'weight',
                }}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            {meta.touched && meta.error && <StyledErrorMessage name={field.name} component="div" />}
        </FormControl>
    );
};

export default PasswordField;