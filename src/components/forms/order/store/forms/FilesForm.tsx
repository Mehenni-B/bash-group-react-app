import { Typography, Box, TextField, Card, CardContent } from "@mui/material";
import TitleWithIcon from "../components/TitleWithIcon";
import { FileField } from "../../../../fields/_index";
import ConditionsCheckboxField from "../../../../fields/ConditionsCheckboxField";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { useEffect } from "react";

const FilesForm: React.FC<{ setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void }> = ({ setFieldValue }) => {
    const selectedService = useSelector((state: RootState) => state.service.current);

    useEffect(() => {
        if (selectedService)
            console.log(selectedService['docs'])
    }, [selectedService]);
    return <>
        <Card sx={{ mt: 4, py: 4 }}>
            <CardContent>
                <Box>
                    <Typography component="h3" color={"#1E1E1E"} sx={{ fontSize: "17px", fontWeight: 400 }}>
                        يرجى تحديد المربعات الخاصة بكل مستند مطلوب ويمكنك تقديمه
                    </Typography>
                    <Typography component="span" color={"#A5A5A5"} sx={{ fontSize: "15px", fontWeight: 400 }}>
                        يرجى رفع الملفات بأحد هذه الامتدادات (PDF - JPEG - PNG)
                        ويجب أن يكون حجم الملف أقل من 2 ميجابايت
                    </Typography>
                    <Box>
                        {selectedService && selectedService.docs?.map((doc) => (
                            <FileField key={doc.id} name={`files[${doc.id}]`} label={doc.name_ar} placeholder={doc.name_ar} setFieldValue={setFieldValue} />
                        ))}
                    </Box>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography component="h5" sx={{ fontWeight: 700, fontSize: 22 }}>
                        الشروط والملاحظات
                    </Typography>
                    <Box mt={2}>
                        <Typography component="h6" sx={{ fontWeight: 500, fontSize: 20 }}>
                            شروط الخدمة
                        </Typography>
                        <TitleWithIcon value={"أكبر من 18 عامًا"} />
                        <TitleWithIcon value={"لديه سجل تجاري"} />
                        <ConditionsCheckboxField name="agreeTerms" setFieldValue={setFieldValue} />
                        <Typography variant="h6" component="span" color={"#272727"}>
                            الملاحظات الخدمة
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ddd", borderRadius: 2, mt: 2 }}>
                            <TextField variant="outlined" type="text" name="note" onChange={(e) => setFieldValue("note", e.target.value)} sx={{ width: "100%" }}
                                placeholder="إذا كان لديك أي ملاحظات أو معلومات أخرى تريد أن نعرفها، فيرجى كتابتها هنا." />
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card >
    </>
}

export default FilesForm;