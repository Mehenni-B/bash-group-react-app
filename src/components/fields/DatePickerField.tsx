import { ErrorMessage, useField } from 'formik';
import { FormControl, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs'

interface FieldProps {
    label?: string;
    fieldName: string;
    maxDate?: Date;
    placeholder?: string;
    width?: string;
    autoFocus?: boolean;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const StyledErrorMessage = styled(ErrorMessage)`
  color: #f00;
  margin-top: 5px;
  font-size: 14px;
  padding-left: 7px;
`;

const DatePickerField: React.FC<FieldProps> = ({ label, fieldName, placeholder = '', maxDate, autoFocus = false, width = "100%", setFieldValue }) => {
    const [{ name }, meta] = useField(fieldName);

    return (
        <FormControl id={name} sx={{ mt: 2, width: width, px: 1 }} variant="outlined">
            {label && <Typography sx={{ mb: 2, fontSize: 14, fontWeight: 600 }}>{label}</Typography>}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        name={name}
                        maxDate={maxDate ? dayjs(maxDate) : undefined}
                        sx={{ width: '100%' }}
                        label={placeholder}
                        autoFocus={autoFocus}
                        format="YYYY-MM-DD"
                        onChange={(newDate) => {
                            const date = dayjs(newDate).format('YYYY-MM-DD');
                            console.log()
                            if (setFieldValue) {
                                setFieldValue(fieldName, date); // Set the field value in Formik
                            }
                        }}
                    />
                </DemoContainer>
            </LocalizationProvider>
            {meta.touched && meta.error && <StyledErrorMessage name={name} component="div" />}
        </FormControl>
    );
};

export default DatePickerField;