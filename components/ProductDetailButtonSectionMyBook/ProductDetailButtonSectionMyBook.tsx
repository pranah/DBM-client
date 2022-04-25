import styled from "@emotion/styled";
import { Button, Grid } from "@mui/material";
import { ListForSaleButton } from "../ListForSaleButton/ListForSaleButton";
import { ListForRentButton } from "../ListForRentButton/ListForRentButton";
import { BookDetails } from "../../utils/common.types";

export const RoundedButton = styled(Button)({
  borderRadius: "10px",
  textTransform: "none",
});

interface ProductDetailButtonSectionMyBookProps {
  bookDetails: BookDetails;
}

export const ProductDetailButtonSectionMyBook = ({
  bookDetails,
}: ProductDetailButtonSectionMyBookProps) => {
  return (
    <>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item>
          <ListForSaleButton bookDetails={bookDetails} />
        </Grid>
        <Grid item>
          <ListForRentButton bookDetails={bookDetails} />
        </Grid>
      </Grid>
    </>
  );
};
