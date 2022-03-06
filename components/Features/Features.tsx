import { Box, Grid, Typography } from "@mui/material";
import styles from "./Features.module.css";

export const Features = () => {
  return (
    <Box sx={{ px: 10, backgroundColor: "#E5E5E5", py: 15 }}>
      <Typography
        color="tertiary.main"
        sx={{
          width: "100%",
          textAlign: "center",
          borderBottom: "1px dashed",
          borderColor: "tertiary.main",
          lineHeight: "0.1em",
          margin: "10px 0 20px",
          position: "relative",
          "&>span": {
            background: "#E5E5E5",
            padding: "0 10px",
            paddingLeft: "50px",
          },
        }}
        component="h2"
      >
        <span style={{ postion: "relative" }}>
          {" "}
          {/* <span className={styles.telescope}></span> */}
          <img
            style={{
              position: "absolute",
              display: "inline-block",
              top: "-15px",
              left: "0",
            }}
            src="static/images/telescope.svg"
          />
          Explore All Other Features
        </span>
      </Typography>
      <Grid container alignItems="center" direction="row" sx={{ mb: 8 }}>
        <Grid item md={6} xl={6} lg={6}>
          <Typography
            sx={{
              fontSize: "4.5rem",
              lineHeight: "4.5rem",
              backgroundColor: "#fff",
              ml: -10,
              pl: 10,
              py: 3,
              mb: 2,
              width: "min-content",
              paddingRight: "3rem",
              borderRadius: "0px 2rem 2rem 0px",
              textShadow: "2px 2px 0px #76ebf2",
              fontWeight: 600,
            }}
            component="h2"
            variant="h4"
            color="tertiary.main"
          >
            Read & Annotate
          </Typography>
          <Typography>
            Dive into the books you love, and annotate them while you read it.
            Annotations make a book come alive. It’s an added layer, a story
            within a story. Each of your annotations are attached to your
            particular ebook, and they change hands with the ebook. A note
            written by your father in his favourite book can be passed on to
            your daughter, in time.
          </Typography>
        </Grid>
        <Grid
          className={styles.imageContainer}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          item
          md={6}
          xl={6}
          lg={6}
        >
          <img src="static/images/writing-women.svg" />
        </Grid>
      </Grid>
      <Grid
        alignItems="center"
        direction="row-reverse"
        container
        sx={{ mb: 8 }}
      >
        <Grid item md={6} xl={6} lg={6}>
          <Typography
            sx={{
              fontSize: "4.5rem",
              lineHeight: "4.5rem",
              backgroundColor: "#fff",
              mr: -10,
              pr: 10,
              py: 3,
              mb: 2,
              paddingLeft: "3rem",
              borderRadius: "2rem 0px 0px 2rem",
              textShadow: "2px 2px 0px #76ebf2",
              fontWeight: 600,
            }}
            component="h2"
            variant="h4"
            color="tertiary.main"
          >
            Resell{" "}
          </Typography>
          <Typography>
            As your property, you are able to resell an ebook you own, and you
            decide the price. You can auction them as well, of course. A portion
            of the value goes to the author/publisher, as content creators.
          </Typography>
        </Grid>
        <Grid className={styles.imageContainer} item md={6} xl={6} lg={6}>
          <img style={{ width: "100%" }} src="static/images/man-nft.svg" />
        </Grid>
      </Grid>

      <Grid container alignItems="center">
        <Grid item md={6} xl={6} lg={6}>
          <Typography
            sx={{
              fontSize: "4.5rem",
              lineHeight: "4.5rem",
              backgroundColor: "#fff",
              ml: -10,
              pl: 10,
              py: 3,
              mb: 2,
              width: "min-content",
              paddingRight: "3rem",
              borderRadius: "0px 2rem 2rem 0px",
              textShadow: "2px 2px 0px #76ebf2",
              fontWeight: 600,
            }}
            component="h2"
            variant="h4"
            color="tertiary.main"
          >
            Rent{" "}
          </Typography>
          <Typography>
            You can rent your ebooks out, without worrying whether you’ll get
            them back. Choose a time period to rent them out, and choose the
            price you want to rent it on. Sit back and relax while your ebooks
            make you money before coming back to you.
          </Typography>
        </Grid>
        <Grid className={styles.imageContainer} item md={6} xl={6} lg={6}>
          <img style={{ width: "100%" }} src="static/images/rent.svg" />
        </Grid>
      </Grid>
      <Grid container alignItems="center" direction="row-reverse">
        <Grid item md={6} xl={6} lg={6}>
          <Typography
            sx={{
              fontSize: "4.5rem",
              lineHeight: "4.5rem",
              backgroundColor: "#fff",
              mr: -10,
              pr: 10,
              py: 3,
              mb: 2,
              paddingLeft: "3rem",
              borderRadius: "2rem 0px 0px 2rem",
              textShadow: "2px 2px 0px #76ebf2",
              fontWeight: 600,
            }}
            component="h2"
            variant="h4"
            color="tertiary.main"
          >
            Publish{" "}
          </Typography>
          <Typography>
            Publish your books on our platform, and get royalties on any
            secondary transactions on the ebook NFTs, in addition to the direct
            sales! A whole new revenue stream gets opened up, a much needed help
            for the publishing community.
          </Typography>
        </Grid>
        <Grid className={styles.imageContainer} item md={6} xl={6} lg={6}>
          <img
            style={{ width: "100%" }}
            src="static/images/online-shopping-for-books.svg"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
