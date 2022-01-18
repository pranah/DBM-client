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

export function ResellMyBook({ bookName, tokenId }) {
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
          console.log(err);
          throw err;
        },
        onSuccess: () => {
          console.log("success");
          handleClose();
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>Sell </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Sell you copy</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Do you want to sell you copy of ${bookName}`}
          </DialogContentText>
          <Input
            value={myBookValueInEth}
            onChange={(e) => setMyBookValueInEth(Number(e.target.value))}
            id="resalePrice"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={resellNFT} autoFocus>
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
