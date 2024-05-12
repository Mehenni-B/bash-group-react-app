import { StepTitle } from "../components/_index";
import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import TitleWithIcon from "../components/TitleWithIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import OrderViewModel from "../../../../../view-models/OrderViewModel";

const NextButton = styled(Button)({
  backgroundColor: "#1077BC",
  fontSize: "16px",
  width: "max-content",
  color: "white",
  padding: "16px 64px",
  marginBottom: "16px",
  borderRadius: "64px",
  "&:hover": {
    backgroundColor: "#005a8c",
  },
});

const PreviousButton = styled(Button)({
  backgroundColor: "#FF8C00",
  fontSize: "16px",
  width: "max-content",
  color: "white",
  padding: "16px 64px",
  marginBottom: "16px",
  borderRadius: "64px",
  "&:hover": {
    backgroundColor: "#E67700",
  },
});

interface DocumentBoxProps {
  title: string;
  documentName?: string;
}

const DocumentBox: React.FC<DocumentBoxProps> = ({ title, documentName }) => (
  <Box display="flex" flexDirection="column" gap={1}>
    <TitleWithIcon value={title} />
    <Box display={"flex"} alignItems={"center"} borderRadius={2} justifyContent={"space-between"} width={"100%"} gap={1} border={"solid 1px #0D5F96"} p={"5px 15px"}>
      <Typography variant="h6" fontSize={"15px"} component="span" color={"#060606"}>
        {documentName}
      </Typography>
    </Box>
  </Box>
);

const StepFour: React.FC<{ setActiveStep: (value: number) => void, activeStep: number }> = ({ setActiveStep, activeStep }) => {
  const selectedService = useSelector((state: RootState) => state.service.current);
  const order = useSelector((state: RootState) => state.order.current);
  const errorMessage = useSelector((state: RootState) => state.order.errorMessage);
  const storeOrder = (new OrderViewModel()).store;

  const handlSubmit = async () => {
    if (order && selectedService) {
      var formData = new FormData();
      formData.append("service_id", (selectedService.id!).toString());

      order.files && order.files.map((file: any, key) => (
        file && formData.append(`files[${key}]`, file)
      ))

      formData.append("name", order.name!);
      formData.append("phone", order.phone!);
      formData.append("email", order.email!);
      formData.append("country", order.country!);
      formData.append("city", order.city!);
      order.note && formData.append("note", order.note);
      order.tin_number && formData.append("tin_number", order.tin_number.toString());
      order.birth_date && formData.append("birth_date", order.birth_date);
      order.gender && formData.append("gender", order.gender);

      const response = await storeOrder(formData);
      if (response) {
        console.log(response);
        console.log(activeStep++);
        setActiveStep(activeStep++)
      }
    }
  }
  return <>
    <Box mt={3} p={3} borderRadius={2} boxShadow={"0 5px 20px #33333315"} sx={{ backgroundColor: "#fff" }} display={"flex"} flexDirection={"column"} gap={5}>
      <Box mt={3} display={"flex"} gap={2} justifyContent={"space-between"} alignItems={"center"} pb={1.5} borderBottom={"1px solid #C0C0C080"}>
        <Box display={"flex"} flexDirection={"column"}>
          <StepTitle title={selectedService?.name_ar!} />
          <Typography variant="h5" component="span" color={"#272727"} fontSize={"22px"}>{selectedService?.administration_name_ar!}</Typography>
        </Box>
        <Box display={"flex"} gap={2}>
          <NextButton onClick={handlSubmit}>أرسل الطلب</NextButton>
          <PreviousButton onClick={() => setActiveStep(2)}>الخطوة السابقة</PreviousButton>
        </Box>
      </Box>
      {errorMessage && <Typography variant="h6" fontSize={"15px"} component="span" color={"#FF0000"}>{errorMessage}</Typography>}
      <Box display={"flex"} gap={10}>
        <Box display={"flex"} flexDirection={"column"} gap={1} flex={1}>
          <Typography variant="h6" fontSize={"22"} component="span" color={"#0D77BC"} fontWeight={"bold"}>
            المستندات المطلوبة
          </Typography>
          {order?.files && order.files.map((file: any, key: number) => {
            return selectedService?.docs?.map((doc) => {
              if (doc.id === key) return <DocumentBox key={key} title={doc.name_ar} documentName={file.name} />
            })
          })}
          <Box mt={1.5}>
            <Typography variant="h6" fontSize={"22"} component="span" color={"#0D77BC"} fontWeight={"bold"} mb={1.5}>
              شروط الخدمة
            </Typography>
            <TitleWithIcon value={"أكبر من 18 عامًا"} />
            <TitleWithIcon value={"لديه سجل تجاري"} />
          </Box>
          <Box>
            <Typography variant="h6" fontSize={"22"} component="span" color={"#0D77BC"} fontWeight={"bold"} mt={1.5} display={"flex"}>
              ملاحظة على الطلب
            </Typography>
            <Typography variant="h6" fontSize={"15px"} component="span" color={"#1E1E1E"} ml={1} mt={1}>{order?.note}</Typography>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={3} flex={1}>
          <Box display={"flex"} flexDirection={"column"} gap={0.5}>
            <Typography variant="h6" fontSize={"22"} component="span" color={"#0D77BC"} fontWeight={"bold"} mb={1}>
              معلومات شخصية
            </Typography>
            {order && <>
              <TitleWithIcon value={order?.name!} />
              {order.tin_number && <TitleWithIcon value={order.tin_number.toString()} />}
              {order.birth_date && <TitleWithIcon value={order.birth_date} />}
              {order.gender && <TitleWithIcon value={order.gender} />}
              <TitleWithIcon value={order.phone!} />
              <TitleWithIcon value={order.email!} />
              <TitleWithIcon value={order.country!} />
              <TitleWithIcon value={order.city!} />
            </>}
          </Box>

          <Box display={"flex"} flexDirection={"column"} gap={0.5}>
            <Typography variant="h6" fontSize={"22"} component="span" color={"#0D77BC"} fontWeight={"bold"} mb={1}>
              معلومات حول الخدمة
            </Typography>
            {selectedService && <>
              <TitleWithIcon value={`السعر : ${selectedService.fees} ريال`} fontWeight="bold" />
              <TitleWithIcon value={`الضريبة : ${selectedService.tax}%`} fontWeight="bold" />
              <TitleWithIcon value={`مدة تنفيذ الخدمة : ${selectedService.execution_days} أيام`} fontWeight="bold" />
              <TitleWithIcon value={`الرسوم الحكومية : ${selectedService.government_fees} ريال`} fontWeight="bold" />
            </>}
          </Box>
        </Box>
      </Box>
    </Box>
  </>;
};

export default StepFour;