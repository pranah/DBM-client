import {
  InputLabel as MuiInputLabel,
  TextField as MuiTextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
export { FileUpload } from "../../FileUpload/FileUpload";

export const InputLabel = styled(MuiInputLabel)(({ theme }) => {
  return {
    fontWeight: "500",
    color: theme.palette.text.primary,
    fontSize: "15px",
    marginBottom: "6px",
  };
});

export const TextField = styled(MuiTextField)(({ theme }) => {
  return {
    marginBottom: "1.5rem",
  };
});
