import React from "react";
import { red } from "@mui/material/colors";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { StaticRatingFilled } from "../StaticRatingFilled/StaticRatingFilled";

export const ReviewCard = () => {
  return (
    <>
      <Card elevation={0} sx={{ backgroundColor: "#f5f5f5" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Raman"
          sx={{ pb: "0" }}
        />
        <CardContent>
          <Grid container alignItems="center">
            <Typography variant="subtitle1" sx={{ mr: 1 }}>
              Rented and rated
            </Typography>
            <StaticRatingFilled value={2} />
          </Grid>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            consequatur maiores distinctio modi nemo vero et sequi natus quis
            veniam tempore tenetur architecto soluta, eveniet aliquam ipsum
            laborum nam. Reprehenderit enim quibusdam laborum tenetur quia
            temporibus cumque sapiente id aspernatur nobis, corrupti eaque
            delectus, illum perferendis quisquam iste iure perspiciatis!
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            3 days ago
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
