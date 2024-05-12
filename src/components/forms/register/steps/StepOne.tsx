import { Alert, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import IndividualRegisterForm from "../IndividualRegisterForm";
import CompanyRegisterForm from "../CompanyRegisterForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const accountsTypes = [
    {
        value: 'individual',
        label: 'فردي',
    },
    {
        value: 'company',
        label: 'منشأة',
    },
];

const StepOne: React.FC<{ setActiveStep: (step: number) => void }> = ({ setActiveStep }) => {
    const [clientType, setClientType] = useState('');
    const registerErrorMessage = useSelector((state: RootState) => state.user.registerErrorMessage);
    const handleChange = (event: SelectChangeEvent) => {
        setClientType(event.target.value as string);
    };

    return <>
        {registerErrorMessage && <Alert severity='error'> {registerErrorMessage}</Alert>}
        <FormControl id={'user_type'} sx={{ mt: 2, width: '100%', px: 1 }} variant="outlined">
            <InputLabel>نوع الحساب"</InputLabel>
            <Select
                label="نوع الحساب"
                autoFocus={true}
                value={clientType}
                onChange={(event) => handleChange(event)}
            >
                {accountsTypes && accountsTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
        {clientType && <>
            {(clientType === 'individual') ? <>
                <IndividualRegisterForm setActiveStep={setActiveStep} />
            </> : <>
                <CompanyRegisterForm setActiveStep={setActiveStep} />
            </>
            }
        </>
        }
    </>
}

export default StepOne;