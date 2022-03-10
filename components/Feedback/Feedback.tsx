import {
  Alert,
  Button,
  Grid,
  Snackbar,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

export const Feedback = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({
    message: "Success",
    open: false,
  });
  const { message, open } = toast;

  const handleSubmit = async () => {
    try {
      await fetch(
        "https://api.jotform.com/form/212194224835050/submissions?apiKey=643f71ab871251b62d9af4e291f01c11",
        {
          body: `submission[3]=${email}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
        }
      );
      setToast({
        message: "Success",
        open: true,
      });
      setEmail("");
    } catch {
      setToast({
        message: "Failed",
        open: true,
      });
    }
  };
  const handleClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ py: 15, backgroundColor: "tertiary.main" }}
    >
      <Grid
        sx={{ px: 10, maxWidth: "700px", textAlign: "center" }}
        container
        direction="column"
        alignItems="center"
      >
        <Snackbar
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={handleClose}
          message={message}
          key={"topright"}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>

        <Typography
          sx={{ lineHeight: "130%", mb: 2 }}
          component="h2"
          variant="h5"
          color="tertiary.text"
        >
          SignUp for Early Access{" "}
        </Typography>
        <Typography color="tertiary.text">
          The project is close to launch, and we’d love to know if you’re
          interested in becoming an early adopter of the platform.
        </Typography>
        <TextField
          sx={{
            my: 2,
            color: "#fff",
            borderColor: "#fff",
            "& label": {
              color: "#fff",
            },
            "& fieldset": {
              borderColor: "#fff",
            },
          }}
          type="email"
          size="small"
          id="outlined-email"
          label="Enter you email"
          fullWidth
          color="homeText"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {/* <TextareaAutosize
          minRows={6}
          placeholder="Enter Your Feedback"
          style={{
            width: "100%",
            padding: "1rem",
            backgroundColor: "transparent",
          }}
        /> */}
        <Button
          variant="contained"
          size="large"
          fullWidth={matches}
          sx={{
            mt: 2,
            px: 8,
            color: "tertiary.main",
            textTransform: "none",
            borderRadius: "10px",
          }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </Grid>
    </Box>
  );
};
