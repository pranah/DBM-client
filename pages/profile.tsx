import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { NavigationDrawer } from "../components/NavigationDrawer/NavigationDrawer";
import Image from "next/image";

const MarketPlace = () => {
  const [editState, setEditState] = useState(false);
  const { user } = useMoralis();

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        height: "100%",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <NavigationDrawer />
      <Box
        sx={{
          width: "calc(100% - 19vw)",
          pb: 4,
          pt: 2,
        }}
      >
        <Stack direction="row" spacing={2}>
          <Box>
            <Box
              sx={{
                backgroundColor: "#EBEBEB",
                borderRadius: "100%",
                margin: "34px",
              }}
            >
              <Image
                alt="avatar"
                src="/images/avatar.png"
                width={217}
                height={217}
              />
            </Box>
          </Box>
          <Box>
            {" "}
            <Box sx={{ margin: "50px" }}>
                <Typography variant="h3">{user?.getUsername()}</Typography>
                

                <Typography>
                  {user?.get("email") || "Please edit this content"}
                </Typography>
           
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default MarketPlace;
