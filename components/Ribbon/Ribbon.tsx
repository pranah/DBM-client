import React from "react";
import styles from "./Ribbon.module.css";

export const Ribbon = ({ label }) => {
  return (
    <div className={styles["ribbon-wrapper"]}>
      <div className={styles.ribbon}>{label}</div>
    </div>
  );
};
