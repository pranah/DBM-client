import styled from "@emotion/styled";
import { Button, Grid } from "@mui/material";
import { ListForSaleButton } from "../ListForSaleButton/ListForSaleButton";
import { ListForRentButton } from "../ListForRentButton/ListForRentButton";

export const RoundedButton = styled(Button)({
  borderRadius: "10px",
  textTransform: "none",
});

type BookDetails = {
  title: string;
  author: string;
};

interface ProductDetailButtonSectionMyBookProps {
  bookDetails: BookDetails;
}

export const ProductDetailButtonSectionMyBook = ({
  bookDetails,
}: ProductDetailButtonSectionMyBookProps) => {
  return (
    <>
      <Grid container spacing={2}>
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
