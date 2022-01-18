import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HighlightIcon from "@mui/icons-material/Highlight";

const actions = [
  { icon: <AutoStoriesIcon />, name: "Page" },
  { icon: <HighlightIcon />, name: "Highlight" },
];

export default function SpeedDialTooltipOpen({
  showPageBar,
  setShowPageBar,
  handleShowDrawer,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (actionName) => {
    console.log(actionName);

    if (actionName === "Page") {
      setShowPageBar(!showPageBar);
    } else {
      handleShowDrawer();
    }
    handleClose();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        transform: "translateZ(0px)",
        flexGrow: 1,
        zIndex: 999,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            FabProps={{
              color: "primary",
            }}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleClick(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
