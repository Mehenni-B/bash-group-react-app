import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const Pagination: React.FC<{ changePageHandler: (pageNumber: number) => void }> = ({ changePageHandler }) => {
  const ordersCollection = useSelector((state: RootState) => state.order.list);

  const renderPageNumbers = () => {
    const pageNumbers = Array.from(Array(ordersCollection!.lastPage).keys());

    return pageNumbers.map((pageNumber) => {
      const pageNum = pageNumber + 1;
      console.log('pageNum', pageNum)
      console.log(ordersCollection!.lastPage)
      if (pageNum === 1 || pageNum === ordersCollection!.currentPage || pageNum === ordersCollection!.currentPage + 1 || pageNum === ordersCollection!.lastPage) {
        return (
          <Button
            key={pageNum}
            onClick={() => changePageHandler(pageNum)}
            disabled={ordersCollection!.currentPage === pageNum}
            variant="contained"
            sx={{ mx: 1, backgroundColor: "#BBD9ED50", color: "#0D77BC", boxShadow: "none", "&:hover": { boxShadow: "none", backgroundColor: "#50aae650" } }}
          >
            {pageNum}
          </Button>
        );
      }

      return <div>.</div>;
    });
  };


  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", }}>
      {ordersCollection && <>
        <Box></Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button sx={{ mx: 1 }} variant="contained"
              disabled={ordersCollection.currentPage === 1}
              onClick={() => changePageHandler(ordersCollection.currentPage - 1)}
            >
              الصفحة السابقة
            </Button>

            {renderPageNumbers()}

            <Button sx={{ mx: 1 }} variant="contained"
              disabled={ordersCollection.nextPageUrl ? false : true}
              onClick={() => changePageHandler(ordersCollection.currentPage + 1)}
            >
              الصفحة التالية
            </Button>
          </Box>

        </Box>
      </>
      }
    </Box>
  );
};

export default Pagination;
