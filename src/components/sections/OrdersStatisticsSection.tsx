import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { OrderStatisticCard } from "../cards/_index";

const OrdersStatisticsSection: React.FC = () => {
  const ordersCollection = useSelector((state: RootState) => state.order.list);

  return (
    <Box sx={{ display: "flex", width: "100%", gap: 3, marginTop: 2 }}>
      {ordersCollection && <>
        <OrderStatisticCard title="جميع الطلبات" value={ordersCollection.total} background="linear-gradient(90deg, #6FA4C830 , #027FCF30 )" color="#1077BC" />
        <OrderStatisticCard title="قيد المراجعة" value={ordersCollection.accepted_count + ordersCollection.pending_count} background="linear-gradient(90deg, #B1A49230 , #DF932D30 )" color="#DF932D" />
        <OrderStatisticCard title="المرفوضة" value={ordersCollection.canceled_by_admin_count} background="linear-gradient(90deg, #CEA5A530 , #CF020230 )" color="#ED5050" />
        <OrderStatisticCard title="المنتهية" value={ordersCollection.finished_count} background="linear-gradient(90deg, #98C59C30 , #0FDD0B30 )" color="#3BC963" />
      </>}
    </Box>
  );
};

export default OrdersStatisticsSection;
