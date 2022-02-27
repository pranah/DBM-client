import React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export const StaticRatingFilled = ({ value }) => {
  return (
    <>
      <Rating
        sx={{
          "& .MuiRating-iconFilled": {
            color: "#626262",
          },
          "& .MuiRating-iconEmpty": {
            color: "#626262",
          },
        }}
        name="rating"
        value={value}
        readOnly
        precision={1}
        icon={<StarIcon fontSize="small" />}
        emptyIcon={<StarOutlineIcon fontSize="small" />}
      />
    </>
  );
};
