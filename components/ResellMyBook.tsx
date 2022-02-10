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
import { TextField } from "@mui/material";

export function ResellMyBook({ bookName, tokenId, setLoadingState, loadNFTs }) {
  const [open, setOpen] = React.useState(false);
  const [myBookValueInEth, setMyBookValueInEth] = React.useState(0);

  const { Moralis, isInitialized } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function resellNFT() {
    setLoadingState("not-loaded");
    const resalePrice = Moralis.Units.ETH(myBookValueInEth);
    let options = {
      contractAddress: pranaAddress,
      functionName: "putTokenForSale",
      abi: Prana.abi.filter((fn) => fn.name === "putTokenForSale"),
      params: {
        salePrice: resalePrice,
        tokenId: tokenId,
      },
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log("error", err);
          throw err;
        },
        onSuccess: () => {
          console.log("success");
          handleClose();
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState("loaded");
      loadNFTs();
    }
  }

  return (
    <div>
      <Button
        size="large"
        sx={{ ml: 1 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Sell{" "}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Sell you copy</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Do you want to sell your copy of ${bookName}`}
          </DialogContentText>
          <TextField
            fullWidth
            variant="standard"
            label="Value in matic"
            helperText="Enter a value greater than 0"
            sx={{ mt: 2 }}
            value={myBookValueInEth}
            onChange={(e) => setMyBookValueInEth(Number(e.target.value))}
            id="resalePrice"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button disabled={!myBookValueInEth} onClick={resellNFT} autoFocus>
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ResellMyBook.defaultProps = {
  bookName: "",
};
