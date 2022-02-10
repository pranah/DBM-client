import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function DrawerListItem({
  text,
  onDeleteIconClick,
  onListItemClick,
  annotation,
  isEdit,
  handleSaveButtonClick,
}) {
  const [isEditing, setIsEditing] = React.useState(isEdit);
  const [annotationText, setAnnotationText] = React.useState(annotation || "");

  const toggleEditing = () => setIsEditing(!isEditing);

  const onChangeAnnotation = (e) => {
    setAnnotationText(e.target.value);
  };

  const onSaveAnnotation = () => {
    handleSaveButtonClick(annotationText);
    setIsEditing(false);
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14, fontStyle: "italic" }}
              color="text.secondary"
              gutterBottom
            >
              {text}
            </Typography>
            {isEditing ? (
              <TextareaAutosize
                aria-label="annotation"
                minRows={3}
                placeholder="Annotation"
                style={{ width: "100%" }}
                value={annotationText}
                onChange={onChangeAnnotation}
              />
            ) : (
              <Typography variant="body2">{annotation}</Typography>
            )}
          </CardContent>
          <CardActions>
            <IconButton onClick={onListItemClick}>
              <VisibilityIcon />
            </IconButton>
            {isEditing ? (
              <IconButton onClick={onSaveAnnotation}>
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton onClick={toggleEditing}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={onDeleteIconClick}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
