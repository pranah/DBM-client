import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { BookDetailsBanner } from "../BookDetailsBanner/BookDetailsBanner";
import { NavigationDrawer } from "../NavigationDrawer/NavigationDrawer";
import { ProductDetailButtonSetion } from "../ProductDetailButtonSetion/ProductDetailButtonSetion";

export const PDP = () => {
  const src =
    "https://ipfs.moralis.io:2053/ipfs/QmckUFY6PLYvkx1esnXNkfmy3atW8PWGcwPGGAx7Yp7tLk";
  return (
    <Container sx={{ display: "flex" }} maxWidth={false}>
      <NavigationDrawer />
      <Grid sx={{ width: "calc(100vw - 240px)" }} container>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Image
            alt="some tes"
            loader={() => src}
            src={src}
            layout="responsive"
            width={428}
            height={608}
          />
        </Grid>
        <Grid sx={{ px: 8 }} item xs={12} sm={12} md={8} lg={8}>
          <Typography sx={{ mb: 2 }} variant="h1">
            Title of book
          </Typography>
          <Typography sx={{ mb: 4 }} variant="subtitle1">
            By Arjun
          </Typography>
          <Typography sx={{ mb: 4 }} variant="subtitle1">
            Owned By Arjun
          </Typography>
          <Typography sx={{ mb: 4 }} variant="body1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
            molestiae natus consectetur quidem autem aliquam vel inventore?
            Rerum neque quas voluptatem velit corrupti culpa error magni
            repellendus, impedit sint molestias!
          </Typography>
          <BookDetailsBanner />
          <ProductDetailButtonSetion />
        </Grid>
      </Grid>
    </Container>
  );
};
