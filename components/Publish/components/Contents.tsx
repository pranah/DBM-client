import { Grid, Button } from "@mui/material";
import { InputLabel, TextField, FileUpload } from "./FormComponents";
import { PublishFormWrapper } from "./PublishFormWrapper";
import Image from "next/image";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

export const Contents = () => {
  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      content: null,
      metaData: null,
      description: "",
      reviews: "",
    },
  });

  const onSubmit = (data) => {
    console.log("data", data);
  };

  console.log('getValues("content")', getValues("content"));

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Grid container sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <>
                <label
                  style={{
                    height: "136px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#F4F4F4",
                    border: "1px solid #CCCCCC",
                    borderRadius: "10px",
                    justifyContent: "center",
                  }}
                  tabindex="0"
                  htmlFor="content"
                >
                  <input
                    style={{ display: "none" }}
                    id="content"
                    accept=".epub, "
                    {...register("content")}
                    type="file"
                  />
                  <Image
                    width={33}
                    height={35}
                    src="/images/upload.png"
                    alt="explore"
                  />
                  Upload Ebook file
                </label>
                {getValues("content") && (
                  <span>{getValues("content")[0]?.name}</span>
                )}
              </>
            </Grid>
          </Grid>
          <Grid container sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <>
                <label
                  style={{
                    height: "136px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#F4F4F4",
                    border: "1px solid #CCCCCC",
                    borderRadius: "10px",
                    justifyContent: "center",
                  }}
                  tabindex="0"
                  htmlFor="metaData"
                >
                  <input
                    style={{ display: "none" }}
                    id="metaData"
                    accept="image/png, image/gif, image/jpeg"
                    {...register("metaData")}
                    type="file"
                  />
                  <Image
                    width={33}
                    height={35}
                    src="/images/upload.png"
                    alt="explore"
                  />
                  Upload Cover Image
                </label>
              </>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <InputLabel htmlFor="description">Description</InputLabel>
              <TextField
                {...register("description")}
                fullWidth
                multiline
                variant="outlined"
                size="small"
                placeholder="Write description here.."
                id="description"
                rows={8}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="reviews">Reviews</InputLabel>
              <TextField
                {...register("reviews")}
                multiline
                fullWidth
                variant="outlined"
                placeholder="Write review here.."
                size="small"
                id="reviews"
                rows={8}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }}>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Proceed
        </Button>
      </Grid>
    </>
  );
};

// export const Contents = ({ tabIndex, setTab }) => {
//   return (
//     <PublishFormWrapper tab={tabIndex} setTab={setTab}>
//       <ContentsForm />
//     </PublishFormWrapper>
//   );
// };
