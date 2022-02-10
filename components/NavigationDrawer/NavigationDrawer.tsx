import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

const drawerWidth = 240;

export const NavigationDrawer = () => {
  return (
    <>
      <Drawer
        sx={{
          // TO DO - UPDATE THE HEIGHT DYNMICALY CHECK IF THERE IS ANY VARIBLES
          height: "calc(100% - 64px)",
          //   TODO - WIDTH CAN BE STORED WITH THEME
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            height: "calc(100% - 64px)",
            bottom: 0,
            width: drawerWidth,
            boxSizing: "border-box",
            top: "auto",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
