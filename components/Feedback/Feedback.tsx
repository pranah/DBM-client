import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export const Feedback = () => {
  return (
    <Box display="flex" justifyContent="center" sx={{ py: 15 }}>
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
        >
          Let us know if you’re excited about what we’re building!
        </Typography>
        <Typography>
          The project is close to launch, and we’d love to know if you’re
          interested in becoming an early adopter of the platform.
        </Typography>
        <TextField
          sx={{ my: 2 }}
          size="small"
          id="outlined-email"
          label="Email"
          fullWidth
        />
        <TextareaAutosize
          minRows={6}
          placeholder="Enter Your Feedback"
          style={{
            width: "100%",
            padding: "1rem",
            backgroundColor: "transparent",
          }}
        />
        <Button variant="contained" size="large" sx={{ mt: 2, px: 8 }}>
          Submit
        </Button>
      </Grid>
    </Box>
  );
};
