import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export function HeaderTabs({ tabNames, tabComponents }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", background: "rgba(255,255,255,0.7)" }}>
      <Box>
        <Tabs
          value={value}
          indicatorColor="secondary"
          onChange={handleChange}
          aria-label=""
          sx={{
            backgroundColor: "rgba(255,255,255,0.7)",
            "& .MuiTabs-indicator": {
              width: "2rem!important",
              top: 0,
            },
          }}
        >
          {tabNames.map((tab) => (
            <Tab
              color="secondary"
              sx={{
                paddingRight: 0,
                paddingLeft: 0,
                mr: 2,
                alignItems: "flex-start",
                "&.Mui-selected": {
                  color: "secondary.main",
                  fontWeight: "bold",
                },
              }}
              label={tab}
            />
          ))}
        </Tabs>
      </Box>
      {tabComponents.map((tabComponent, i) => (
        <TabPanel value={value} index={i}>
          {tabComponent()}
        </TabPanel>
      ))}
    </Box>
  );
}
