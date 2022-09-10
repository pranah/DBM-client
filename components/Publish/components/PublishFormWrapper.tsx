import { Button, Grid } from "@mui/material";

export const PublishFormWrapper = ({ children, tab, setTab }) => {
  const handleProceedClick = () => {
    setTab((prevState) => {
      return prevState < 2 ? prevState + 1 : prevState;
    });
  };

  return (
    <>
      {children}
      <Grid container sx={{ mt: 4 }}>
        <Button onClick={handleProceedClick} variant="contained">
          {tab === 2 ? "Publish" : "Proceed"}
        </Button>
      </Grid>
    </>
  );
};
