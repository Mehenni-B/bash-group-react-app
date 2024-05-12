import { CircularProgress, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AdministrationViewModel } from "../../view-models/_index";

const AdministrationsSelectSection: React.FC = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const administrations = useSelector((state: RootState) => state.administration.list);
    const selectedAdministrationId = useSelector((state: RootState) => state.administration.currentId);
    const [administrationId, setAdministrationId] = useState(selectedAdministrationId);
    const administrationViewModel = new AdministrationViewModel();
    const getAdministrations = administrationViewModel.getList;
    const selectAdministrationId = administrationViewModel.selectId;

    useEffect(() => {
        const getAdministrationList = async () => await getAdministrations();
        getAdministrationList();

        if (firstLoad)
            setFirstLoad(false)
        else
            selectAdministrationId(administrationId)

    }, [administrationId]);

    return <>
        <Typography variant="h2" sx={{ fontSize: 24, fontWeight: 600 }}>الإدارة</Typography>
        {
            administrations ? <>
                <FormControl sx={{ mt: 2, width: '100%', px: 1 }} variant="outlined">
                    <Select value={administrationId} onChange={(event) => setAdministrationId(Number(event.target.value))} >
                        {administrations.map((administration) => (
                            <MenuItem key={administration.id} value={administration.id}>{administration.name_ar}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </> : <>
                <CircularProgress />
            </>
        }
    </>
}

export default AdministrationsSelectSection;