import Typography from "@mui/material/Typography";

interface HeaderProps {
  tabIndex: number;
}

export const Header = ({ tabIndex }: HeaderProps) => {
  return (
    <>
      <div>
        <Typography color="secondary.contrastText" variant="h5">
          Publish
        </Typography>
        <Typography color="#7A7A7A" component="p" variant="body2">
          Step {tabIndex + 1}/3
        </Typography>
      </div>
    </>
  );
};
