import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import { FormLabel, TextField } from "@mui/material";
import Loader from "./loader/Loader";

export function RentMyBook({ bookName, tokenId, loadNFTs }) {
  const [open, setOpen] = React.useState(false);
  const [myBookValueInEth, setMyBookValueInEth] = React.useState(0);
  const [numberofBlocksToRent, setNumberOfBlocksToRent] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const { Moralis, isInitialized } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function rentNFT() {
    const rentPrice = Moralis.Units.ETH(myBookValueInEth);
    const _numberofBlocksToRent = numberofBlocksToRent * 20;
    setIsLoading(true);
    let options = {
      contractAddress: pranaAddress,
      functionName: "putForRent",
      abi: Prana.abi.filter((fn) => fn.name === "putForRent"),
      params: {
        _newPrice: rentPrice,
        tokenId,
        _numberofBlocksToRent,
      },
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          setIsLoading(false);
          console.log(err);
          throw err;
        },
        onSuccess: () => {
          console.log("success");
          setIsLoading(false);
          handleClose();
        },
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      loadNFTs();
    }
  }

  return (
    <div>
      {isLoading && <Loader />}
      <Button
        size="large"
        sx={{ ml: 1 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Rent{" "}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Rent your copy</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Do you want to rent your copy of ${bookName}`}
          </DialogContentText>
          <TextField
            fullWidth
            helperText="Enter a value greater than 0"
            sx={{ mt: 2 }}
            id="my-book-value"
            label="Value in matic"
            variant="standard"
            type="number"
            value={myBookValueInEth}
            onChange={(e) => setMyBookValueInEth(Number(e.target.value))}
          />{" "}
          <TextField
            fullWidth
            // helperText="Enter a value greater than 0"
            sx={{ mt: 2 }}
            id="time-in-minutes"
            label="Renting time in minutes"
            variant="standard"
            type="number"
            value={numberofBlocksToRent}
            onChange={(e) => setNumberOfBlocksToRent(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button disabled={!myBookValueInEth} onClick={rentNFT} autoFocus>
            Rent
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

RentMyBook.defaultProps = {
  bookName: "",
};
