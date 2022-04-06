import { Grid, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";

export const MarketPlaceContainer = () => {
  const [filter, setFilter] = useState(null);

  const handleFilterChange = (e) => {
    console.log("e", e);
  };
  return (
    <>
      <Grid container>
        <Grid item>
          <Typography>2103 Items</Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Select
                value={filter}
                label="filter"
                onChange={handleFilterChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <Select
                value={filter}
                label="filter"
                onChange={handleFilterChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
