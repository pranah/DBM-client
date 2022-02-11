import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

interface StaticRatingProps {
  value: number;
}

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#b6b6b6",
  },
});

export function StaticRating({ value }: StaticRatingProps) {
  return (
    <Box>
      <StyledRating
        readOnly
        name="customized-color"
        defaultValue={value}
        getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}`}
        icon={<StarOutlineIcon fontSize="inherit" />}
        emptyIcon={<></>}
      />
    </Box>
  );
}
