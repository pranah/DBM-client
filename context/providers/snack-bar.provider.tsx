import React, { createContext, useState } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const SnackbarContext = createContext({
  snack: {
    message: "",
    severity: "",
    open: false,
  },
  setSnack: (snack: SnackState) => {},
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackState {
  severity: "error" | "warning" | "info" | "success" | "";
  open: boolean;
  message: string;
}

const intialSnackState: SnackState = {
  message: "",
  severity: "",
  open: false,
};

export function CustomizedSnackbarProvider({ children }) {
  const [snack, setSnack] = useState<SnackState>(intialSnackState);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack(intialSnackState);
  };
  return (
    <SnackbarContext.Provider value={{ snack, setSnack }}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={snack.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            severity={snack.severity}
            sx={{ width: "100%" }}
            onClose={handleClose}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      </Stack>
      <>{children}</>
    </SnackbarContext.Provider>
  );
}
