import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

import { useMoralis } from "react-moralis";

import { Ribbon } from "../components/Ribbon/Ribbon";
import { ordinal_suffix_of } from "../utils";

const PRICE_MAP = {
  home: "price",
  myBooks: "price",
  usedBook: "resalePrice",
  rentedBook: "rentingPrice",
};

type Book = {
  image: string;
};

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book, actionButtons, isPriceInWei = false }) => {
  const { Moralis } = useMoralis();
  return (
    <>
      <Card sx={{ position: "relative" }}>
        {book.copyNumber && (
          <Ribbon label={`${ordinal_suffix_of(book.copyNumber)} Copy`} />
        )}
        <CardMedia
          component="img"
          height="300"
          image={book.image}
          alt="green iguana"
          sx={{
            objectFit: "contain",
          }}
        />
        <CardContent>
          <Grid container justifyContent="space-between">
            <Typography variant="h6">{book.name}</Typography>
          </Grid>
          <Typography variant="caption">by {book.author}</Typography>
          {book.displayPrice && isPriceInWei ? (
            <Typography variant="subtitle1">
              Price: {Moralis.Units.FromWei(book.displayPrice, 18)} Matic
            </Typography>
          ) : (
            <Typography variant="subtitle1">
              Price: {book.displayPrice} Matic
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            {book.description.substring(0, 25) + " ..."}
          </Typography>
          {book.numberOfBlocksToRent && (
            <Typography variant="subtitle2">
              {`Renting time in minutes ${
                Number(book.numberOfBlocksToRent) / 20
              }`}
            </Typography>
          )}
          {book.isUpForRenting && (
            <Chip
              sx={{ mt: 1 }}
              size="small"
              variant="outlined"
              color="info"
              label={`For rent`}
            />
          )}
        </CardContent>

        {actionButtons && <CardActions>{actionButtons()}</CardActions>}
      </Card>
    </>
  );
};

BookCard.defaultProps = {
  isPriceInWei: false,
};
