import { Grid, Divider } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { Typography } from "@mui/material";

export const BookDetailsBanner = () => {
  return (
    <>
      <div style={{ paddingLeft: "1.5rem" }}>
        <Grid
          sx={{ backgroundColor: "#f2f2f2" }}
          container
          columnSpacing={3}
          justifyContent="space-around"
        >
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Genre</Typography>
            <CategoryIcon />
            <Typography>Home Stories</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Length</Typography>
            <MenuBookIcon />
            <Typography>300 pages</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Language</Typography>
            <LanguageIcon />
            <Typography>English</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Publish Date</Typography>
            <CalendarTodayIcon />
            <Typography>02-01-2022</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Age</Typography>
            <PersonIcon />
            <Typography>18</Typography>
          </Grid>
        </Grid>
      </div>
      <Divider sx={{ mb: 1 }} />
    </>
  );
};
