import { Card } from "@mui/material";

import Image from "next/image";
import styles from "./ProductImage.module.css";

export const ProductImage = ({ imageUrl }) => {
  const src = imageUrl;
  return (
    <Card
      elevation={0}
      sx={{
        p: 1,
        borderRadius: "0.5rem",
        backgroundColor: "rgba(208,208,208,0.65)",
      }}
    >
      <Image
        className={styles.image}
        alt="some tes"
        loader={() => src}
        src={src}
        layout="responsive"
        width={428}
        height={608}
      />
    </Card>
  );
};
