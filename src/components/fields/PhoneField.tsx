import { ErrorMessage, useField } from 'formik';
import { FormControl, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { MuiTelInput } from 'mui-tel-input';

interface FieldProps {
    label?: string;
    name: string;
    width?: string;
    autoFocus?: boolean;
    options?: { value: string, label: string }[];
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const StyledErrorMessage = styled(ErrorMessage)`
  color: #f00;
  margin-top: 5px;
  font-size: 14px;
  padding-left: 7px;
`;

const PhoneField: React.FC<FieldProps> = ({ label, name, autoFocus = false, width = "100%", setFieldValue, setValue }) => {
    const [field, meta] = useField(name);

    return (
        <FormControl id={name} sx={{ mt: 2, width: width, px: 1 }} variant="outlined">
            {label && <Typography sx={{ mb: 2, fontSize: 14, fontWeight: 600 }}>{label}</Typography>}
            <MuiTelInput
                fullWidth
                {...field}
                autoFocus={autoFocus}
                error={meta.touched && !!meta.error}
                defaultCountry="SA"
                value={field.value}
                onChange={(value) => {
                    if (setFieldValue) {
                        setFieldValue(name, value);
                    }
                    if (setValue) {
                        setValue(value);
                    }
                }}
            />
            {meta.touched && meta.error && <StyledErrorMessage name={field.name} component="div" />}
        </FormControl>
    );
};

export default PhoneField;