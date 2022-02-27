import { Box, Grid, Typography } from "@mui/material";

export const Features = () => {
  return (
    <Box sx={{ px: 10, backgroundColor: "#fff", py: 15 }}>
      <Grid alignItems="center" container sx={{ mb: 8 }}>
        <Grid item md={6} xl={6} lg={6}>
          <Typography component="h2" variant="h4">
            Publishing and secondary interactions
          </Typography>
          <Typography>
            Just like how you can resell your paperbacks or give it away to your
            loved ones, you are entitled to do whatever you want with your copy
            of the ebook that you bought.
          </Typography>
        </Grid>
        <Grid item md={6} xl={6} lg={6}>
          <img
            style={{ width: "100%" }}
            src="static/images/online-shopping-for-books.png"
          />
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        direction="row-reverse"
        sx={{ mb: 8 }}
      >
        <Grid item md={6} xl={6} lg={6}>
          <Typography component="h2" variant="h4">
            Annotations{" "}
          </Typography>
          <Typography>
            The amalgamation of the reader’s mind with that of the book.
            Annotations are the soul of a book - each copy comes alive with the
            unique annotations that its users add to it over time. These
            annotations travel with the copies when they change hands. A story
            within a story.
          </Typography>
        </Grid>
        <Grid item md={6} xl={6} lg={6}>
          <img src="static/images/writing-women.png" />
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item md={6} xl={6} lg={6}>
          <Typography component="h2" variant="h4">
            Adding more depth to your copies{" "}
          </Typography>
          <Typography>
            Adding an additional layer to your ebooks, now you can know which
            copy of the title you have bought: whether it’s the very first copy
            that’s ever sold, or the 1 millionth copy. And you’re more than
            welcome to monetize on that aspect!
          </Typography>
        </Grid>
        <Grid item md={6} xl={6} lg={6}>
          <img
            style={{ width: "100%" }}
            src="static/images/girl-phone-likes.png"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
