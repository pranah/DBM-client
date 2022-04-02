import { Grid, Divider, Box } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { Typography } from "@mui/material";

export const BookDetailsBanner = ({ genre, language }) => {
  return (
    <>
      <Box style={{ paddingLeft: "1.5rem" }}>
        <Grid
          sx={{ backgroundColor: "#f2f2f2", py: 1 }}
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
            <Typography variant="caption" color="text.secondary">
              Genre
            </Typography>
            <CategoryIcon sx={{ my: 1 }} />
            <Typography variant="body2">{genre}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Length
            </Typography>
            <MenuBookIcon sx={{ my: 1 }} />
            <Typography variant="body2">300 pages</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Language
            </Typography>
            <LanguageIcon sx={{ my: 1 }} />
            <Typography variant="body2">{language}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Publish Date
            </Typography>
            <CalendarTodayIcon sx={{ my: 1 }} />
            <Typography variant="body2">02-01-2022</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pr: 3,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Age
            </Typography>
            <PersonIcon sx={{ my: 1 }} />
            <Typography variant="body2">18</Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mb: 1 }} />
    </>
  );
};
