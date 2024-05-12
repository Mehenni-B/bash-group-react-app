import { ErrorMessage, useField } from 'formik';
import { FormControl, OutlinedInput, Typography } from '@mui/material';
import styled from '@emotion/styled';

interface FieldProps {
    label?: string;
    name: string;
    placeholder?: string;
    width?: string;
    autoFocus?: boolean;
    options?: { value: string, label: string }[];
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
    setOption?: (value: any) => void;
}

const StyledErrorMessage = styled(ErrorMessage)`
  color: #f00;
  margin-top: 5px;
  font-size: 14px;
  padding-left: 7px;
`;

const InputField: React.FC<FieldProps> = ({ label, name, placeholder = '', autoFocus = false, width = "100%" }) => {
    const [field, meta] = useField(name);

    return (
        <FormControl id={name} sx={{ mt: 2, width: width, px: 1 }} variant="outlined">
            <Typography sx={{ mb: 2, fontSize: 14, fontWeight: 600 }}>{label}</Typography>
            <OutlinedInput
                fullWidth
                {...field}
                placeholder={placeholder}
                autoFocus={autoFocus}
                error={meta.touched && !!meta.error}
                autoComplete={name}
            />
            {meta.touched && meta.error && <StyledErrorMessage name={field.name} component="div" />}
        </FormControl>
    );
};

export default InputField;