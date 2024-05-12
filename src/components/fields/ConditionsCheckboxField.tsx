import { ErrorMessage, useField } from 'formik';
import { Checkbox, FormControl, FormControlLabel, Typography } from '@mui/material';
import styled from '@emotion/styled';

interface FieldProps {
    name: string;
    width?: string;
    options?: { value: string, label: string }[];
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const StyledErrorMessage = styled(ErrorMessage)`
  color: #f00;
  margin-top: 5px;
  font-size: 14px;
  padding-left: 7px;
`;

const ConditionsCheckboxField: React.FC<FieldProps> = ({ name, width = "100%", setFieldValue }) => {
    const [field, meta] = useField(name);

    return <>
        <FormControl id={name} sx={{ my: 2, width: width, px: 1 }} variant="outlined">
            <FormControlLabel
                id={name}
                control={<Checkbox color="primary" />}
                label={<>
                    <Typography variant="body1" component={"h3"} fontSize={"18px"} >
                        بالضغط على هذا المربع فإنك تؤكد موافقتك على هذه الشروط
                        وأنها تتوافق مع قدراتك.
                    </Typography>
                </>}
                sx={{ width: width }}
                value={field.value}
                onChange={(event) => {
                    if (setFieldValue) {
                        setFieldValue(name, (event.target as HTMLInputElement).checked);
                    }
                }}
            />
            {meta.touched && meta.error && <StyledErrorMessage name={field.name} component="div" />}
        </FormControl>
    </>;
};

export default ConditionsCheckboxField;