import React, { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import {ChatbubbleSVG,EditSVG,TrashSVG,BriefcaseSVG} from "../../../../assets/svg/_index";
import { useParams } from "react-router-dom";
import Alert from "./DeleteAlert";
import ApprovalAndEvaluationAlert from "./ApprovalAndEvaluationAlert";

interface SlideProps {
  setOpenConversation: (value: boolean) => void;
}

const Slide: React.FC<SlideProps> = ({ setOpenConversation }) => {
  const [open, setOpen] = useState(false);
  const [approvalAndEvaluationAlertOpen, setApprovalAndEvaluationAlertOpen] =
    useState(false);

  interface MyButtonProps {
    color: any;
    title: string;
    onClickFunction?: () => void;
  }
  const MyButton: React.FC<MyButtonProps> = ({
    color,
    title,
    onClickFunction = () => {
      console.log(null);
    },
  }) => {
    return (
      <Button
        variant="contained"
        onClick={onClickFunction}
        color={color}
        sx={{ py: 1.5, px: 1.5, fontSize: 14, fontWeight: 600, borderRadius: 8, boxShadow: "none", "&:hover": { boxShadow: "none" } }}
      >
        {title}
      </Button>
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

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

  interface Status {
    title: string | null;
    background: string;
    color: string;
    button: JSX.Element | null;
  }

  const getStatus = (status: number): Status => {
    switch (status) {
      case 0:
        return {
          title: "قيد المراجعة",
          background: "linear-gradient(90deg, #B1A49230 , #DF932D30 )",
          color: "#DF932D",
          button: null,
        };
      case 1:
        return {
          title: "الموافقة والتقييم",
          background: "linear-gradient(90deg, #98C59C30 , #0FDD0B30 )",
          color: "#3BC963",
          button: (
            <MyButton title={"الموافقة والتقييم"} color={"success"} onClickFunction={() => setApprovalAndEvaluationAlertOpen(true)} />
          ),
        };
      case 2:
        return {
          title: "منتهية",
          background: "linear-gradient(90deg, #6FA4C830 , #027FCF30 )",
          color: "#0B5D94",
          button: null,
        };
      case 3:
        return {
          title: "تعديل الطلب",
          background: "linear-gradient(90deg, #CEA5A530 , #CF020230 )",
          color: "#ED5050",
          button: <MyButton title={"تعديل الطلب"} color={"error"} />,
        };
      default:
        return {
          title: null,
          background: "transparent",
          color: "#272727",
          button: null,
        };
    }
  };

  return (
    <>
      <Alert setOpen={setOpen} open={open} />
      <ApprovalAndEvaluationAlert setOpen={setApprovalAndEvaluationAlertOpen} open={approvalAndEvaluationAlertOpen} />
      <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #dedede", paddingBottom: 2, alignItems: "center" }}>
        <Box>{getStatus(Number(id) - 1).button}</Box>
        <Box sx={{ display: "flex" }}>
          <IconButton onClick={() => setOpenConversation(true)} color="primary" aria-label="view">
            <ChatbubbleSVG />
          </IconButton>

          {id - 1 !== 2 && (
            <>
              <IconButton color="secondary" aria-label="edit">
                <EditSVG />
              </IconButton>
              <IconButton color="error" aria-label="delete" onClick={handleClickOpen}>
                <TrashSVG />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
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
    </>
  );
}

export default Slide;