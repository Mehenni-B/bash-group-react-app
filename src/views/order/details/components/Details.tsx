import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { TitleWithIcon } from "../../../../components/forms/order/store/components/_index";
import { Link, useParams } from "react-router-dom";
import { ShareSVG } from "../../../../assets/svg/_index";
import { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import OrderViewModel from "../../../../view-models/OrderViewModel";

const Title: React.FC<{ value: string }> = ({ value }) => (
    <Typography variant="h6" fontSize="22px" component="span" color="#0D77BC" fontWeight="bold" lineHeight={2}>
        {value}
    </Typography>
);

interface DocumentBoxProps {
    title: string;
    withShareIcon?: boolean;
    link?: string;
}

const DocumentBox: React.FC<DocumentBoxProps> = ({ title, withShareIcon = false, link }) => (
    <Box display="flex" gap={2} mt={0.5} sx={{ "path": { stroke: "#DF932D" } }}>
        <TitleWithIcon value={title} />
        {withShareIcon && link && <Link to={link} target="_blanck"><ShareSVG /></Link>}
    </Box>
);

const Details: React.FC = () => {
    const { id } = useParams();
    const selectedOrder = useSelector((state: RootState) => state.order.selected);
    const getOrderDetails = (new OrderViewModel()).getDetails;


    useEffect(() => {
        getOrderDetails(Number(id));
    }, []);

    const getStatusTitle = (status: string) => {
        switch (status) {
            case 'NP':
                return { title: "المستحقات غير مدفوعه", background: "linear-gradient(261.07deg, rgba(207, 2, 2, 0.2) 1.52%, rgba(206, 165, 165, 0.2) 100%)", color: "#ED5050" };
            case 'P':
                return { title: "بانتظار الموافقة", background: "linear-gradient(90deg, #98C59C30 , #0FDD0B30 )", color: "#3BC963" };
            case 'A':
                return { title: "قيد المراجعة", background: "linear-gradient(90deg, #B1A49230 , #DF932D30 )", color: "#DF932D" };
            case 'F':
                return { title: "منتهية", background: "linear-gradient(90deg, #6FA4C830 , #027FCF30 )", color: "#0B5D94" };
            case 'CA':
                return { title: "مرفوضة", background: "linear-gradient(261.07deg, rgba(207, 2, 2, 0.2) 1.52%, rgba(206, 165, 165, 0.2) 100%)", color: "#ED5050" };
            case 'CU':
                return { title: "ملغاة بواسطتك", background: "linear-gradient(261.07deg, rgba(207, 2, 2, 0.2) 1.52%, rgba(206, 165, 165, 0.2) 100%)", color: "#ED5050" };
            default:
                return { title: null, color: "#272727" };
        }
    };


    return <>
        <Box component="div" p={3} borderRadius={2} sx={{ backgroundColor: "#fff", boxShadow: "0 5px 20px #33333315", display: "flex", flexDirection: "column", gap: 1, width: "70%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #dedede", paddingBottom: 2 }}>
                <Box display="flex" flexDirection="column" gap={1}>
                    <Typography variant="h6" sx={{ color: "#DF932D", fontWeight: "bold", lineHeight: 1, fontSize: "28px" }}>
                        {selectedOrder?.service_name_ar}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#272727", lineHeight: 1, fontWeight: "500", fontSize: "22px" }}>
                        {selectedOrder?.administration_name_ar}
                    </Typography>
                </Box>
                {selectedOrder && (
                    <Box sx={{ borderRadius: 2, padding: "0.5rem 1rem", background: getStatusTitle(selectedOrder.status).background }}>
                        <Typography variant="h6" sx={{ color: getStatusTitle(selectedOrder.status).color, fontWeight: "bold", fontSize: "16px" }}>
                            {getStatusTitle(selectedOrder.status).title}
                        </Typography>
                    </Box>
                )}
            </Box>
            {
                selectedOrder && <>
                    <Box>
                        <Title value="المستندات المطلوبة" />
                        {selectedOrder?.files.map((file) => <DocumentBox withShareIcon={true} title={file.name_ar} link={file.path} />)}
                    </Box>

                    <Box>
                        <Title value="شروط الخدمة" />
                        <DocumentBox title="أكبر من 18 عامًا" />
                        <DocumentBox title="لديه سجل تجاري" />
                    </Box>

                    <Box>
                        <Title value="معلومات شخصية" />
                        <DocumentBox title={selectedOrder?.user_name ?? ""} />
                        <DocumentBox title={selectedOrder?.user_phone ?? ""} />
                        <DocumentBox title={selectedOrder?.user_email ?? ""} />
                    </Box>

                    <Box>
                        <Title value="معلومات حول الخدمة" />
                        <DocumentBox title={`السعر : ${selectedOrder?.total_price} ريال`} />
                        <DocumentBox title={`الضريبة : ${selectedOrder?.tax}%`} />
                        <DocumentBox title={`مدة تنفيذ الخدمة : ${selectedOrder?.execution_days} أيام`} />
                        <DocumentBox title={`الرسوم الحكومية : ${selectedOrder?.government_fees} ريال`} />
                    </Box>
                </>
            }
        </Box>
    </>
};

export default Details;
