import React from "react";
import styles from "./Ribbon.module.css";

export const Ribbon = ({ label }) => {
  console.log("styles", styles);

  return (
    <div className={styles["ribbon-wrapper"]}>
      <div className={styles.ribbon}>{label}</div>
    </div>
  );
};
