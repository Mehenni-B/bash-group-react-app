import React, { FC } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import {
  RightArrowSVG,
  BriefcaseSVG,
  ShareSVG,
  PersonCircleSVG,
  SendSVG,
} from "../../../../assets/svg/_index";

interface ConversationProps {
  setOpenConversation: (open: boolean) => void;
}

const Conversation: FC<ConversationProps> = ({ setOpenConversation }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
      <Box sx={{ display: "flex", padding: "1.5rem 6rem", justifyContent: "center", alignItems: "center", borderBottom: "1px solid #dedede", paddingBottom: 3, position: "relative" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#202020", fontSize: "20px" }}>
          ياسر الحازمي
        </Typography>
        <IconButton onClick={() => setOpenConversation(false)} color="primary" sx={{ display: "flex", position: "absolute", left: 0, alignItems: "center" }}>
          <RightArrowSVG />
        </IconButton>
      </Box>
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 2, justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", borderRadius: "50%", background: "#E0ECF4", flexShrink: 0 }}>
            <BriefcaseSVG />
          </Box>
          <Box sx={{ display: "flex", background: "#F5F5F5", flexDirection: "column", borderRadius: 2, p: 1, mt: 2 }}>
            <Typography variant="body1" sx={{ fontSize: "16px", color: "#272727" }}>
              مرحباً أيها العميل إذا كنت بحاجة إلى أي شيء أنا هنا يمكنني مساعدتك
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ display: "flex", background: "#F5F5F5", flexDirection: "column", borderRadius: 2, p: 1, mt: 2 }}>
            <Typography variant="body1" sx={{ fontSize: "16px", color: "#272727" }}>
              مرحباً أيها العميل إذا كنت بحاجة إلى أي شيء أنا هنا يمكنني مساعدتك
            </Typography>
          </Box>
          <Box sx={{ width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", borderRadius: "50%", background: "#DF932D24", flexShrink: 0 }}>
            <PersonCircleSVG />
          </Box>
        </Box>
      </Box>
      <Box sx={{ border: "1px solid #0D5F96", borderRadius: 2, display: "flex", padding: ".2rem .5rem" }}>
        <TextField variant="outlined" placeholder="اكتب رسالة" fullWidth={true} sx={{ "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { border: "none" }, borderRadius: 4 }} />
        <IconButton sx={{ path: { stroke: "#0D77BC" } }}>
          <ShareSVG />
        </IconButton>
        <IconButton>
          <SendSVG />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Conversation;
