import { ErrorMessage, useField } from 'formik';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
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

const SelectField: React.FC<FieldProps> = ({ label, name, placeholder = '', autoFocus = false, width = "100%", options = [], setFieldValue, setOption }) => {
    const [field, meta] = useField(name);

    return (
        <FormControl id={name} sx={{ mt: 2, width: width, px: 1 }} variant="outlined">
            {label && <InputLabel id={name}>{label}</InputLabel>}
            <Select
                labelId={name}
                id={name}
                label={label}
                {...field}
                placeholder={placeholder}
                autoFocus={autoFocus}
                error={meta.touched && !!meta.error}
                value={field.value}
                onChange={(event) => {
                    const value = event.target.value;
                    if (setOption) {
                        setOption(value);
                    }
                    if (setFieldValue) {
                        setFieldValue(name, value);
                    }
                }}
            >
                {options && options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
            {meta.touched && meta.error && <StyledErrorMessage name={field.name} component="div" />}
        </FormControl>
    );
};

export default SelectField;