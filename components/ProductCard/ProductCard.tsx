import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { ProductCardProps } from "./ProductCard.types";

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: 180,
        borderRadius: "0.5rem",
        border: "1px solid #e2e2e2",
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={product.image}
        alt={product.name}
        sx={{ px: 1, pt: 1, borderRadius: "1rem" }}
      />
      <CardContent sx={{ p: 1, "&.MuiCardContent-root": { pb: 1 } }}>
        <Typography sx={{ mb: 0 }} gutterBottom variant="body2" component="h6">
          {product.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {product.author}
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          // sx={{ mt: 1 }}
        >
          <Typography variant="caption" color="text.primary">
            {product.price}
          </Typography>{" "}
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="caption"
            color="text.primary"
          >
            <StarOutlineIcon
              sx={{ color: "#606060", fontSize: "1.25rem", mr: 0.5 }}
            />
            {product.rating}
          </Typography>
        </Grid>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
