import { FC } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CheckedSVG } from "../../../../../assets/svg/_index";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

const PreviousButton = styled(Button)({
  backgroundColor: "#FF8C00",
  color: "#FFFFff",
  fontSize: "16px",
  width: "100%",
  padding: "16px",
  borderRadius: "64px",
  "&:hover": {
    backgroundColor: "#E67700",
  },
});

const Slide: FC<{ setActiveStep: (value: number) => void, activeStep: number }> = ({ setActiveStep, activeStep }) => {
  const selectedService = useSelector((state: RootState) => state.service.current);
  const order = useSelector((state: RootState) => state.order.current);

  return <>
    <Card sx={{ py: 4 ,boxShadow:"0 0 10px #33333315"}}>
      <CardContent>
        <Box>
          <Button disabled={selectedService === null} type="submit" variant="contained" sx={{ mb: 4, py: 2, px: 4, fontSize: 14, fontWeight: 600, borderRadius: 8, width: '100%' }}>
            الخطوة التالية
          </Button>
          <Box display="flex" flexDirection="column" gap={1.5}>
            <Typography variant="h5" component="span" color="#272727" fontWeight="bold">معلومات الطلب</Typography>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6" fontSize="18px" component="span" color="#272727">الإدارة : {selectedService?.administration_name_ar}</Typography>
              <Typography variant="h6" fontSize="18px" component="span" color="#272727">الخدمة : {selectedService?.name_ar}</Typography>
            </Box>
          </Box>

          {activeStep === 2 && <>
            <RenderInfo title="المستندات المطلوبة" items={["الهوية الحكومية", "سجيل تجاري", "الشهادة المالية"]} />
            <RenderInfo title="شروط الخدمة" items={["أكبر من 18 عامًا", "لديه سجل تجاري", "خيار التقسيط"]} />

            <Box display="flex" flexDirection="column" mt={1}>
              <Typography variant="h6" fontSize="18px" component="span" color="#0D77BC" fontWeight="bold">
                ملاحظة على الطلب
              </Typography>
              <Typography variant="h6" fontSize="15px" component="span" color="#1E1E1E" ml={1} mt={1}>{order?.note}</Typography>
            </Box>
          </>}
        </Box>
        <Box sx={{ mt: (activeStep === 2) ? '20%' : '100%' }}>
          {activeStep > 0 && <>
            <PreviousButton onClick={() => { setActiveStep(activeStep - 1); }}>الخطوة السابقة</PreviousButton>
          </>}
        </Box>
      </CardContent>
    </Card >
  </>
};

const RenderInfo: React.FC<{ title: string, items: string[] }> = ({ title, items }) => {
  return <>
    <Box display="flex" flexDirection="column" mt={1}>
      <Typography variant="h6" fontSize="18px" component="span" color="#0D77BC" fontWeight="bold">{title}</Typography>
      {items.map((item, index) => (
        <Box display="flex" alignItems="center" mt={1} key={index}>
          <CheckedSVG />
          <Typography variant="h6" fontSize="18px" component="span" color="#1E1E1E" ml={1}>{item}</Typography>
        </Box>
      ))}
    </Box>
  </>
}

export default Slide;
