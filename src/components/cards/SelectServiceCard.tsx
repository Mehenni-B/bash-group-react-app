import { Box, Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { EyeSVG, CheckMarkCircleSVG, UserSettingsSVG } from "../../assets/svg/_index";
import { ServiceType } from "../../models/Service";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ServiceViewModel } from "../../view-models/_index";
import { useState } from "react";

const SelectServiceCard: React.FC<{ service: ServiceType }> = ({ service }) => {
  const [isLoading, setIsLoading] = useState(false);
  const selectedService = useSelector((state: RootState) => state.service.current);
  const getServiceDetails = (new ServiceViewModel()).getDetails;

  const onSelectHandler = async () => {
    setIsLoading(true);
    await getServiceDetails(service.id);
    setIsLoading(false);
  }

  return <>
    {
      isLoading ? <>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
          <CircularProgress size={'4rem'} />
        </Box>
      </> : <>
        <Button onClick={onSelectHandler} sx={{ p: 0, width: "100%", textAlign: "start" }} >
          <Card sx={{ py: 0, height: "200px", width: "100%", position: "relative", boxShadow: "0 0 20px #3331" }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <UserSettingsSVG />
                <EyeSVG />
              </Box>
              <Typography variant="h2" sx={{ mt: 2, fontSize: 18, fontWeight: 600 }}>{service.name_ar}</Typography>
              <Typography sx={{ mt: 2, fontSize: 14, fontWeight: 400 }}>{service.administration_name_ar}</Typography>
              {(selectedService?.id === service.id) && <>
                <Box
                  sx={{
                    display: "flex",
                    position: "absolute",
                    inset: "0",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(103, 103, 103,40%)",
                  }}
                >
                  <CheckMarkCircleSVG />
                </Box>
              </>}
            </CardContent>
          </Card>
        </Button>
      </>
    }
  </>
};

export default SelectServiceCard;
