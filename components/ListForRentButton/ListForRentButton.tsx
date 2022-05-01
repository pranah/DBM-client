import {
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState, useContext } from "react";
import { useRouter } from "next/router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BookDetails } from "../../utils/common.types";
import { RoundedButton } from "../ProductDetailButtonSectionMyBook/ProductDetailButtonSectionMyBook";
import { RentBookModal } from "../RentBookModal/RentBookModal";
import { usePutForRent } from "../../hooks/putForRent";
import { SnackbarContext } from "../../context/providers/snack-bar.provider";

const schema = yup
  .object()
  .shape({
    value: yup
      .number()
      .typeError("Please enter a value")
      .required("Please enter a value")
      .positive("Please enter a value greater than zero"),
    noOfBlocks: yup
      .number()
      .typeError("Please enter a value")
      .required("Please enter a value")
      .positive("Please enter a value greater than zero"),
  })
  .required();

const RentBookContent = ({ register, errors }) => {
  return (
    <Grid sx={{ mt: 5 }} container alignItems="center">
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
            <TextField
              {...register("value", { valueAsNumber: true })}
              error={!!errors.value}
              helperText={errors.value ? errors.value.message : ""}
              inputProps={{ min: 0 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Image
                      alt="eth"
                      src="/images/eth-icon.svg"
                      width={20}
                      height={20}
                    />
                  </InputAdornment>
                ),
              }}
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
            <TextField
              {...register("noOfBlocks")}
              error={!!errors.noOfBlocks}
              helperText={errors.noOfBlocks ? errors.noOfBlocks.message : ""}
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
  handleSubmit: Function;
}

const RentBookActionButton = ({
  handleClose,
  handleSubmit,
}: RentBookActionButtonProps) => {
  const router = useRouter();
  const tokenId = router.query.tokenId as string;
  const { rentNFT } = usePutForRent();
  const { setSnack } = useContext(SnackbarContext);
  const onSuccess = () => {
    handleClose();
    setSnack({
      open: true,
      message: "Book rented Successfully",
      severity: "success",
    });
    router.push("/library");
  };

  const onError = () => {
    setSnack({
      open: true,
      message: "Error renting book",
      severity: "error",
    });
  };

  const onRentClick = (data) => {
    rentNFT(data.value, data.noOfBlocks, tokenId, onSuccess, onError);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <RoundedButton
            onClick={handleSubmit(onRentClick)}
            fullWidth
            variant="contained"
          >
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

interface ListForRentButtonProps {
  bookDetails: BookDetails;
}

export const ListForRentButton = ({ bookDetails }: ListForRentButtonProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      value: "",
      noOfBlocks: "",
    },
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <>
      <RoundedButton variant="outlined" onClick={handleOpen} size="large">
        List For Rent
      </RoundedButton>
      <RentBookModal
        open={open}
        handleClose={handleClose}
        actionButtons={() => (
          <RentBookActionButton
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        )}
        bookDetails={bookDetails}
        dialogContent={() => (
          <RentBookContent errors={errors} register={register} />
        )}
      />
    </>
  );
};
