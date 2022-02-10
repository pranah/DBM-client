import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

import { useRouter } from "next/router";
import { useMoralisFile, useWeb3ExecuteFunction } from "react-moralis";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DrawerListItem from "../DrawerListItem/DrawerListItem";

import { pranaAddress } from "../../config";
import Prana from "../../artifacts/contracts/prana.sol/prana.json";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

export default function HighLightDrawer({
  open,
  highLightText,
  deleteHighlight,
  showHeightlightedContent,
  handleDrawerClose,
  handleSaveButtonClick,
}) {
  let router = useRouter();
  const { url, tokenId } = router.query;
  const { saveFile, isUploading } = useMoralisFile();
  const contractProcessor = useWeb3ExecuteFunction();

  const saveAnnotationToChain = async () => {
    const metaData = {
      annotations: highLightText,
      updatedAt: new Date(),
    };
    const metaDataJsonAnnotation = JSON.stringify(metaData);
    const annotationIpfsIResp = await saveFile(
      "annotation.json",
      {
        base64: window.btoa(
          unescape(encodeURIComponent(metaDataJsonAnnotation))
        ),
      },
      { saveIPFS: true }
    );

    const ipfsCID = annotationIpfsIResp?._ipfs;
    let options = {
      contractAddress: pranaAddress,
      functionName: "setTokenURI",
      abi: Prana.abi.filter((fn) => fn.name === "setTokenURI"),
      params: {
        _uniqueCIDfortoken: ipfsCID,
        tokenId,
      },
    };
    try {
      await contractProcessor.fetch({
        params: options,
        onError: (err) => {
          console.log(err);
          throw err;
        },
        onSuccess: () => {
          console.log("success");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <React.Fragment>
        <Drawer
          hideBackdrop
          anchor="right"
          open={open}
          onClose={handleDrawerClose}
        >
          <Box
            sx={{
              width: 500,
              pb: 2,
            }}
          >
            <DrawerHeader>
              <Typography sx={{ px: 2 }} variant="h6" component="h6">
                Highlights
              </Typography>

              <Button onClick={saveAnnotationToChain}>
                Save annotation to chain
              </Button>
              <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />

            <List component="nav" aria-label="main mailbox folders">
              {highLightText?.map(
                ({ text, cfiRange, annotation, isEditing, id }, index) => {
                  return (
                    <>
                      <DrawerListItem
                        text={text}
                        isEdit={isEditing}
                        annotation={annotation}
                        onListItemClick={(event) =>
                          showHeightlightedContent(cfiRange)
                        }
                        onDeleteIconClick={() =>
                          deleteHighlight(index, cfiRange)
                        }
                        handleSaveButtonClick={(annotation) =>
                          handleSaveButtonClick(annotation, index)
                        }
                      />
                    </>
                  );
                }
              )}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
