import React from "react";
import styled from "@emotion/styled";
import { Box, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")({
  position: "relative",
  width: "100%",
  color: "#0B5D94",
});

const SearchIconWrapper = styled("div")({
  padding: "1rem",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledInputBase = styled(InputBase)(() => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: ".5rem",
    paddingLeft: "3rem",
    width: "100%",
  },
}));

const SearchBar: React.FC<{ searchHandler: (value: string) => void }> = ({ searchHandler }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "#272727" }}>
        الطلبات
      </Typography>

      <Box sx={{ background: "linear-gradient(270deg, #DDEBF4 , #4DA2DB70 )", borderRadius: 2, width: "50%" }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase onChange={(event) => searchHandler(event.target.value)} placeholder="البحث عن الطلب" inputProps={{ "aria-label": "search" }} />
        </Search>
      </Box>
    </Box>
  );
};

export default SearchBar;
