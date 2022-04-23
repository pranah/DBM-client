import {
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { RoundedButton } from "../ProductDetailButtonSectionMyBook/ProductDetailButtonSectionMyBook";
import { RentBookModal } from "../RentBookModal/RentBookModal";

const RentBookContent = () => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <Grid container alignItems="center" sx={{ mb: 1.5 }}>
          <Grid item xs={3}>
            <InputLabel
              sx={{ fontWeight: "500", color: "text.primary" }}
              htmlFor="renting-price"
            >
              Renting price
            </InputLabel>
          </Grid>
          <Grid item xs={7}>
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
              type="number"
              id="renting-price"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <InputLabel
              sx={{ mr: 2, fontWeight: "500", color: "text.primary" }}
              htmlFor="renting-period"
            >
              Period
            </InputLabel>
          </Grid>
          <Grid item xs={7}>
            <OutlinedInput
              inputProps={{ min: 1 }}
              size="small"
              type="number"
              id="renting-period"
            />
          </Grid>
          <Grid sx={{ ml: 1 }} item>
            <Typography color="text.secondary">Days</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

interface RentBookActionButtonProps {
  handleClose: () => void;
}

const RentBookActionButton = ({ handleClose }: RentBookActionButtonProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <RoundedButton fullWidth variant="contained">
            List For Rent
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

type BookDetails = {
  title: string;
  author: string;
};

interface ListForRentButtonProps {
  bookDetails: BookDetails;
}

export const ListForRentButton = ({ bookDetails }: ListForRentButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <RoundedButton variant="outlined" onClick={handleOpen} size="large">
        List For Rent
      </RoundedButton>
      <RentBookModal
        open={open}
        handleClose={handleClose}
        actionButtons={() => <RentBookActionButton handleClose={handleClose} />}
        bookDetails={bookDetails}
        dialogContent={RentBookContent}
      />
    </>
  );
};
