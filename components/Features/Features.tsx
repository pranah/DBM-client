import { Box, Grid, Theme, Typography } from "@mui/material";
import styles from "./Features.module.css";
import Image from "next/image";

import useMediaQuery from "@mui/material/useMediaQuery";
import styled from "@emotion/styled";
import clsx from "clsx";

const ImageContainer = styled.div({
  position: "absolute",
  display: "inline-block",
  top: "-15px",
  left: 0,
});

const TypographyDescription = styled(Typography)(({ theme }) => {
  return {
    color: theme.palette.landingPageDarkPurple.main,
    lineHeight: "25px",
    fontSize: theme.typography.h6.fontSize,
  };
});
export const Features = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        px: { sm: 4, xs: 4, md: 10 },
        backgroundColor: "#FAF8FF",
        py: { sm: 4, xs: 4, md: 15 },
      }}
    >
      <Typography
        color="tertiary.main"
        sx={{
          width: "100%",
          textAlign: "center",
          borderBottom: "1px dashed",
          borderColor: "tertiary.main",
          lineHeight: "0.1em",
          margin: "10px 0",
          position: "relative",
          mb: { sm: 5, xs: 5, md: 3 },
          "&>span": {
            background: "#FAF8FF",
            padding: "0 10px",
            paddingLeft: "50px",
          },
        }}
        component="h2"
      >
        <span style={{ position: "relative" }}>
          {" "}
          {/* <span className={styles.telescope}></span> */}
          <ImageContainer>
            <Image
              width={50}
              height={50}
              src="/images/telescope.svg"
              alt="explore"
              // layout="responsive"
            />
          </ImageContainer>
          Explore All Other Features
        </span>
      </Typography>
      <Grid container alignItems="center" direction="row" sx={{ mb: 8 }}>
        <Grid item md={6} xl={6} lg={6}>
          <Typography
            sx={{
              fontSize: { md: "4.5rem" },
              lineHeight: { md: "4.5rem" },
              backgroundColor: "#fff",
              ml: { xs: -4, sm: -4, md: -10 },
              pl: 10,
              py: 3,
              mb: 2,
              width: "min-content",
              paddingRight: "3rem",
              borderRadius: "0px 2rem 2rem 0px",
              // textShadow: "2px 2px 0px #76ebf2",
              fontWeight: 400,
              fontFamily: "Playfair Display",
            }}
            component="h2"
            variant="h4"
            color="tertiary.main"
          >
            Read & Annotate
          </Typography>
          <TypographyDescription>
            Dive into the books you love, and annotate them while you read it.
            Annotations make a book come alive. It’s an added layer, a story
            within a story. Each of your annotations are attached to your
            particular ebook, and they change hands with the ebook. A note
            written by your father in his favourite book can be passed on to
            your daughter, in time.
          </TypographyDescription>
        </Grid>
        <Grid
          className={clsx(styles.imageContainer, styles.readContainer)}
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
          <Image
            alt="Read and Annotate"
            width={330}
            height={346}
            src="/images/writing-women.svg"
          />
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
              fontSize: { md: "4.5rem" },
              lineHeight: { md: "4.5rem" },
              backgroundColor: "#fff",
              mr: { xs: -4, sm: -4, md: -10 },
              pr: 10,
              py: 3,
              mb: 2,
              paddingLeft: "3rem",
              borderRadius: "2rem 0px 0px 2rem",
              // textShadow: "2px 2px 0px #76ebf2",
              fontWeight: 400,
              fontFamily: "Playfair Display",
            }}
            component="h2"
            variant="h4"
            color="tertiary.main"
          >
            Resell{" "}
          </Typography>
          <TypographyDescription>
            As your property, you are able to resell an ebook you own, and you
            decide the price. You can auction them as well, of course. A portion
            of the value goes to the author/publisher, as content creators.
          </TypographyDescription>
        </Grid>
        <Grid
          className={clsx(styles.imageContainer, styles.resellContainer)}
          item
          md={6}
          xl={6}
          lg={6}
        >
          <Image
            style={{ width: "100%" }}
            alt="resell-books"
            width={614}
            height={345}
            src="/images/man-nft.svg"
          />
        </Grid>
      </Grid>

      <Grid container alignItems="center">
        <Grid item md={6} xl={6} lg={6}>
          <Typography
            sx={{
              fontSize: { md: "4.5rem" },
              lineHeight: { md: "4.5rem" },
              backgroundColor: "#fff",
              ml: { xs: -4, sm: -4, md: -10 },
              pl: 10,
              py: 3,
              mb: 2,
              width: "min-content",
              paddingRight: "3rem",
              borderRadius: "0px 2rem 2rem 0px",
              // textShadow: "2px 2px 0px #76ebf2",
              fontWeight: 400,
              fontFamily: "Playfair Display",
            }}
            component="h2"
            variant="h4"
            color="tertiary.main"
          >
            Rent{" "}
          </Typography>
          <TypographyDescription>
            You can rent your ebooks out, without worrying whether you’ll get
            them back. Choose a time period to rent them out, and choose the
            price you want to rent it on. Sit back and relax while your ebooks
            make you money before coming back to you.
          </TypographyDescription>
        </Grid>
        <Grid
          className={clsx(styles.imageContainer, styles.rentContainer)}
          item
          md={6}
          xl={6}
          lg={6}
        >
          <Image alt="rent" width={542} height={305} src="/images/rent.svg" />
        </Grid>
      </Grid>
      <Grid container alignItems="center" direction="row-reverse">
        <Grid item md={6} xl={6} lg={6}>
          <Typography
            sx={{
              fontSize: { md: "4.5rem" },
              lineHeight: { md: "4.5rem" },
              backgroundColor: "#fff",
              mr: { xs: -4, sm: -4, md: -10 },
              pr: 10,
              py: 3,
              mb: 2,
              paddingLeft: "3rem",
              borderRadius: "2rem 0px 0px 2rem",
              // textShadow: "2px 2px 0px #76ebf2",
              fontWeight: 400,
              fontFamily: "Playfair Display",
            }}
            component="h2"
            variant="h4"
            color="tertiary.main"
          >
            Publish{" "}
          </Typography>
          <TypographyDescription>
            Publish your books on our platform, and get royalties on any
            secondary transactions on the ebook NFTs, in addition to the direct
            sales! A whole new revenue stream gets opened up, a much needed help
            for the publishing community.
          </TypographyDescription>
        </Grid>
        <Grid
          className={clsx(styles.imageContainer, styles.publishContainer)}
          item
          md={6}
          xl={6}
          lg={6}
        >
          <Image
            alt="publish"
            width={610}
            height={343}
            src="/images/online-shopping-for-books.svg"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
