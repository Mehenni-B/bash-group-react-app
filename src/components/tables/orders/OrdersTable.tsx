import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { TableHead, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import OrderViewModel from "../../../view-models/OrderViewModel";
import { SearchBar, Pagination } from "./components/_index";

interface HeadCellType {
  id: string;
  numeric?: boolean;
  label: string;
  sorting: boolean;
}

const headCells: HeadCellType[] = [
  { id: "orderNo", numeric: false, label: "رقم الطلب", sorting: false },
  { id: "date", numeric: false, label: "التاريخ", sorting: true },
  { id: "method", numeric: false, label: "طريقة الطلب", sorting: false },
  { id: "type", numeric: false, label: "نوع الخدمة", sorting: false },
  { id: "status", numeric: false, label: "الحالة", sorting: false },
  { id: "price", numeric: true, label: "السعر", sorting: true },
  { id: "actions", numeric: false, label: "إجراءات", sorting: false },
];

const getStatusTitleAndColor = (status: string) => {
  switch (status) {
    case 'NP':
      return { title: "المستحقات غير مدفوعه", color: "#ED5050" };
    case 'P':
      return { title: "بانتظار الموافقة", color: "#3BC963" };
    case 'A':
      return { title: "قيد المراجعة", color: "#DF932D" };
    case 'F':
      return { title: "منتهية", color: "#0B5D94" };
    case 'CA':
      return { title: "مرفوضة", color: "#ED5050" };
    case 'CU':
      return { title: "ملغاة بواسطتك", color: "#ED5050" };
    default:
      return { title: null, color: "#272727" };
  }
};

const tableTitleCellStyle: React.CSSProperties = {
  fontWeight: "bold",
  textAlign: "center",
  borderBottom: "none",
  color: "#272727",
};


const OrdersTable: React.FC<{ isFullTable?: boolean }> = ({ isFullTable = true }) => {
  const [orderBy, setOrderBy] = useState<"date" | "price">("date");
  const [sortingMethod, setSortingMethod] = useState<"desc" | "asc">("desc");
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState("");
  const getOrderList = (new OrderViewModel()).getList;
  const ordersCollection = useSelector((state: RootState) => state.order.list);

  const sortHandler = (cell: "date" | "price") => {
    setOrderBy(cell);
    sortingMethod === "desc" ? setSortingMethod("asc") : setSortingMethod("desc");
  };

  const changePageHandler = (pageNumber: number) => setPageNumber(pageNumber);

  const searchHandler = (value: string) => {
    if (value.length > 2)
      setQuery(value);

    if (value.length === 0)
      setQuery("");
  };

  useEffect(() => {
    getOrderList({ page: pageNumber, query: query, orderBy: orderBy, sortingMethod: sortingMethod });
  }, [sortingMethod, orderBy, pageNumber, query]);

  return <>
    {isFullTable && <SearchBar searchHandler={searchHandler} />}
    <Box sx={{ minWidth: 750 }}>
      <TableContainer component={Paper} sx={{ overflowX: "auto", boxShadow: "none" }}>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
          <TableHead>
            <TableRow style={{ backgroundColor: "#BBD9ED40" }}>
              {headCells.map((headCell, key) => (
                <TableCell key={key} style={tableTitleCellStyle} sortDirection={headCell.sorting ? sortingMethod : false}>
                  {headCell.sorting ? <>
                    <TableSortLabel active={headCell.sorting} direction={headCell.sorting ? sortingMethod : "asc"} onClick={() => sortHandler(headCell.id === "price" ? "price" : "date")}>
                      {headCell.label}
                      {headCell.sorting && <Box component="span" sx={visuallyHidden}> {sortingMethod === "desc" ? "sorted descending" : "sorted ascending"} </Box>}
                    </TableSortLabel>
                  </> : <>
                    {headCell.label}
                  </>}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersCollection && (isFullTable ? ordersCollection.orders : ordersCollection.orders.slice(0, 5)).map((order) => (
              <TableRow key={order.id}>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold", color: "#DF932D" }}>{order.id}</TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "500", color: "#272727" }}>{order.created_at}</TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "500", color: "#272727" }}>{order.administration_name_ar}</TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "500", color: "#272727" }}>{order.service_name_ar}</TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold", color: getStatusTitleAndColor(order.status).color }}>{getStatusTitleAndColor(order.status).title}</TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "500", color: "#272727" }}><div dir={'ltr'}>{order.total_price} SAR</div></TableCell>
                <TableCell style={{ display: "flex", justifyContent: "center" }}>
                  <Link to={`/order/${order.id}`}>
                    <IconButton color="primary" aria-label="view">
                      <VisibilityIcon />
                    </IconButton>
                  </Link>
                  {/* <IconButton color="secondary" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" aria-label="delete">
                    <DeleteIcon />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isFullTable && <Pagination changePageHandler={changePageHandler} />}
    </Box>
  </>
};

export default OrdersTable;
