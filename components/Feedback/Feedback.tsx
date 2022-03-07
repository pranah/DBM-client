import { Button, Grid, TextField, Theme, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Feedback = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

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
          size="small"
          id="outlined-email"
          label="Enter you email"
          fullWidth
          color="homeText"
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
        >
          Submit
        </Button>
      </Grid>
    </Box>
  );
};
