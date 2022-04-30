import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Grid, InputAdornment, InputLabel, TextField } from "@mui/material";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BookDetails } from "../../utils/common.types";
import { RoundedButton } from "../ProductDetailButtonSectionMyBook/ProductDetailButtonSectionMyBook";
import { RentBookModal } from "../RentBookModal/RentBookModal";
import { useRouter } from "next/router";
import { SnackbarContext } from "../../context/providers/snack-bar.provider";
import { usePutTokenForSale } from "../../hooks/usePutTokenForSale";

const schema = yup
  .object()
  .shape({
    value: yup
      .number()
      .typeError("Please enter a value")
      .required("Please enter a value")
      .positive("Please enter a value greater than zero"),
  })
  .required();

const SaleBookContent = ({ register, errors }) => {
  return (
    <Grid sx={{ mt: 5 }} container alignItems="center">
      <InputLabel
        sx={{ mr: 2, fontWeight: "500", color: "text.primary" }}
        htmlFor="selling-price"
      >
        Selling price
      </InputLabel>
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
        id="selling-price"
      />
    </Grid>
  );
};

interface SaleBookActionButtonProps {
  handleClose: () => void;
  handleSubmit: Function;
}

const SaleBookActionButton = ({
  handleClose,
  handleSubmit,
}: SaleBookActionButtonProps) => {
  const router = useRouter();
  const tokenId = router.query.tokenId as string;
  const { setSnack } = useContext(SnackbarContext);
  const { resellNFT } = usePutTokenForSale();

  const onSuccess = () => {
    handleClose();
    setSnack({
      open: true,
      message: "Book listed for sales Successfully",
      severity: "success",
    });
    router.push("/library");
  };

  const onError = () => {
    setSnack({
      open: true,
      message: "Error putting book for sale",
      severity: "error",
    });
  };

  const onSalesClick = (data) => {
    resellNFT(data.value, tokenId, onSuccess, onError);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <RoundedButton
            onClick={handleSubmit(onSalesClick)}
            fullWidth
            variant="contained"
          >
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
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      value: "",
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
        List For Sale
      </RoundedButton>
      <RentBookModal
        open={open}
        handleClose={handleClose}
        actionButtons={() => (
          <SaleBookActionButton
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        )}
        dialogContent={() => (
          <SaleBookContent errors={errors} register={register} />
        )}
        bookDetails={bookDetails}
      />
    </>
  );
};
