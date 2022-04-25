import { Grid, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { BookDetails } from "../../utils/common.types";
import { RoundedButton } from "../ProductDetailButtonSectionMyBook/ProductDetailButtonSectionMyBook";
import { RentBookModal } from "../RentBookModal/RentBookModal";

const SaleBookContent = () => {
  return (
    <Grid sx={{ mt: 5 }} container alignItems="center">
      <InputLabel
        sx={{ mr: 2, fontWeight: "500", color: "text.primary" }}
        htmlFor="selling-price"
      >
        Selling price
      </InputLabel>
      <OutlinedInput
        inputProps={{ min: 0 }}
        startAdornment={
          <InputAdornment position="start">
            <Image
              alt="eth"
              src="/images/eth-icon.svg"
              width={20}
              height={20}
            />
          </InputAdornment>
        }
        size="small"
        id="selling-price"
      />
    </Grid>
  );
};

interface SaleBookActionButtonProps {
  handleClose: () => void;
}

const SaleBookActionButton = ({ handleClose }: SaleBookActionButtonProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <RoundedButton fullWidth variant="contained">
            List For Sale
          </RoundedButton>
        </Grid>
        <Grid xs={6} item>
          <RoundedButton onClick={handleClose} fullWidth variant="outlined">
            Cancel
          </RoundedButton>
        </Grid>
      </Grid>
    </>
  );
};

interface ListForSaleButtonProps {
  bookDetails: BookDetails;
}

export const ListForSaleButton = ({ bookDetails }: ListForSaleButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <RoundedButton variant="outlined" onClick={handleOpen} size="large">
        List For Sale
      </RoundedButton>
      <RentBookModal
        open={open}
        handleClose={handleClose}
        actionButtons={() => <SaleBookActionButton handleClose={handleClose} />}
        dialogContent={SaleBookContent}
        bookDetails={bookDetails}
      />
    </>
  );
};
