import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(5, 6),
    paddingBottom: 0,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(5),
  },
  "& .MuiDialogTitle-root": {
    backgroundColor: theme.palette.customBackground.lightGray,
    padding: theme.spacing(4, 6),
  },
}));

const StyledDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};

StyledDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

type BookDetails = {
  title: string;
  author: string;
};

interface RentBookModalProps {
  open: boolean;
  handleClose: () => void;
  bookDetails: BookDetails;
  actionButtons: React.ComponentType;
  dialogContent: React.ComponentType;
}

export function RentBookModal({
  open,
  handleClose,
  bookDetails,
  actionButtons,
  dialogContent,
}: RentBookModalProps) {
  const ActionButtons = actionButtons;
  const DialogContentEl = dialogContent;
  return (
    <div>
      <StyledDialog onClose={handleClose} open={open}>
        <StyledDialogTitle onClose={handleClose}>
          <Typography
            sx={{ textTransform: "uppercase" }}
            variant="h6"
            component="span"
          >
            {bookDetails.title}
          </Typography>
          <div>
            <Typography variant="subtitle1" component="span">
              By&nbsp;
            </Typography>
            <Typography variant="subtitle2" component="span">
              {bookDetails.author}
            </Typography>
          </div>
        </StyledDialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <DialogContentEl />
        </DialogContent>
        <DialogActions>{actionButtons && <ActionButtons />}</DialogActions>
      </StyledDialog>
    </div>
  );
}
