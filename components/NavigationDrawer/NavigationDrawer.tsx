import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const drawerWidth = "19vw";

const listItems = [
  {
    name: "Library",
    icon: <HomeOutlinedIcon />,
    url: "/library",
  },
  {
    name: "Marketplace",
    icon: <StoreOutlinedIcon />,
    url: "/market-place",
  },
  {
    name: "Profile",
    icon: <AccountCircleOutlinedIcon />,
    url: "/profile",
  },
  {
    name: "Transactions",
    icon: <ReceiptLongOutlinedIcon />,
    url: "",
  },
];

export const NavigationDrawer = () => {
  const router = useRouter();
  return (
    <>
      <Drawer
        sx={{
          // TO DO - UPDATE THE HEIGHT DYNMICALY CHECK IF THERE IS ANY VARIBLES
          height: "calc(100%)",
          //   TODO - WIDTH CAN BE STORED WITH THEME
          width: drawerWidth,
          minWidth: "240px",
          padding: "2%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            height: "calc(100%)",
            bottom: 0,
            width: drawerWidth,
            minWidth: "240px",
            padding: "2%",

            boxSizing: "border-box",
            top: "auto",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h4" component="h1">
          <Image alt="pranah" src="/images/logo.svg" width={121} height={41} />
        </Typography>
        <List>
          {listItems.map(({ name, icon, url }, index) => (
            <Link href={url} key={name}>
              <ListItem button disableGutters>
                <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    "&>span": {
                      fontWeight:
                        router.pathname === `${url}` ? "bold" : undefined,
                    },
                  }}
                  primary={name}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
};
