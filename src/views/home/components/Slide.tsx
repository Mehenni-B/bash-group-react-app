import React from "react";
import { Box, Typography } from "@mui/material";
import { BriefcaseSVG } from "../../../assets/svg/_index";
import { useParams } from "react-router-dom";

const Slide: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const data = [
    {
      title: "الاسم:",
      description: "لديك ملف مفقود تحتاج إلى تحميله يتعلق بوزارة التجارة",
    },
    {
      title: "الاسم:",
      description: "لديك ملف مفقود تحتاج إلى تحميله يتعلق بوزارة التجارة",
    },
    {
      title: "الاسم:",
      description: "لديك ملف مفقود تحتاج إلى تحميله يتعلق بوزارة التجارة",
    },
  ];



  return (
    <Box p={3} borderRadius={2} sx={{ backgroundColor: "#fff" }} boxShadow={"0 0 10px 0 rgba(0,0,0,0.05)"} display={"flex"} flexDirection={"column"} gap={1} minHeight={"100%"} >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" sx={{ fontSize: "24px", fontWeight: "bold", color: "#272727" }}>
          الملاحظات
        </Typography>
        {data.map((item, index) => (
          <Box key={index} sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", borderRadius: "50%", background: "#E0ECF4", flexShrink: 0 }}>
              <BriefcaseSVG />
            </Box>
            <Box sx={{ display: "flex", background: index === 0 && Number(id) - 1 === 3 ? "linear-gradient(90deg, #CEA5A530 , #CF020230 )" : "#F5F5F5", flexDirection: "column", borderRadius: 2, p: 1, mt: 2 }}>
              <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "bold", color: "#272727" }}>
                {item.title}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "16px", color: "#272727" }}>
                {item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Slide;