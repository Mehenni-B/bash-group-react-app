import { useField } from 'formik';
import { FormControlLabel, Checkbox, Typography, Link } from '@mui/material';

interface FieldProps {
    name: string;
    width?: string;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
    setValue?: (value: any) => void;
}

const TermsCheckboxField: React.FC<FieldProps> = ({ name, width = "100%", setValue }) => {
    const [field] = useField(name);

    return (<>
        <FormControlLabel
            id={name}
            control={<Checkbox color="primary" />}
            label={<>
                <Typography sx={{ mt: 2 }}>
                    بالضغط هنا فإنني أوافق على
                    <Link href="#" underline="none" sx={{ color: 'secondary.main' }}> الشروط والأحكام </Link>
                    وعلى
                    <Link href="#" underline="none" sx={{ color: 'secondary.main' }}> سياسة الخصوصية </Link>
                </Typography>
            </>}
            sx={{ width: width, my: 2 }}
            value={field.value}
            onChange={(event) => {
                if (setValue) {
                    setValue((event.target as HTMLInputElement).checked);
                }
            }}
        />
    </>
    );
};

export default TermsCheckboxField;