import { ErrorMessage, useField } from 'formik';
import { FormControl, Typography, Checkbox, Box } from '@mui/material';
import styled from '@emotion/styled';
import { MuiFileInput } from 'mui-file-input';
import { CgShapeRhombus } from 'react-icons/cg';
import { useState } from 'react';

interface FieldProps {
    label?: string;
    name: string;
    placeholder?: string;
    width?: string;
    autoFocus?: boolean;
    options?: { value: string, label: string }[];
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
    setValue?: (file: File | null) => void;
}

const StyledErrorMessage = styled(ErrorMessage)`
  color: #f00;
  margin-top: 5px;
  font-size: 14px;
  padding-left: 7px;
`;

const FileField: React.FC<FieldProps> = ({ label, name, placeholder, autoFocus = false, width = "100%", setFieldValue, setValue }) => {
    const [field, meta] = useField(name);
    const [isVisible, setIsVisible] = useState(false);

    return (
        <FormControl id={name} sx={{ mt: 2, width: width, px: 1 }} variant="outlined">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {label && <Typography sx={{ my: 2, fontSize: 18, fontWeight: 400 }}><CgShapeRhombus color="#f5a623" /> {label}</Typography>}
                <Checkbox
                    checked={isVisible}
                    onChange={() => setIsVisible(!isVisible)}
                />
            </Box>
            {isVisible && (
                <>
                    <MuiFileInput
                        fullWidth
                        {...field}
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        inputProps={{ accept: '.png, .jpeg, .pdf' }}
                        error={meta.touched && !!meta.error}
                        value={field.value}
                        multiple={false}
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
                </>
            )}
        </FormControl>
    );
};

export default FileField;
