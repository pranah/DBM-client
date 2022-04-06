import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export const CopyBadge = ({ label }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        whiteSpace: "nowrap",
        overflow: "hidden",
        px: 2,
        zIndex: 9,
        minWidth: "80px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: "50%",
        transform: "translate(-50%, 0)",
        top: "13px",
        background:
          "linear-gradient(90deg, #AEAEAE 14.94%, rgb(240 240 240 / 92%) 33.83%, rgb(140 140 140) 95.73%)",
      }}
    >
      <Typography sx={{ fontWeight: "700" }} variant="caption" component="p">
        {label}
      </Typography>
    </Box>
  );
};
