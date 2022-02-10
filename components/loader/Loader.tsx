import CircularProgress from "@mui/material/CircularProgress";

import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <CircularProgress />
    </div>
  );
}

export default Loader;
