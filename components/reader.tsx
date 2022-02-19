import React, { useRef, useState, useEffect, useContext } from "react";
import { ReactReader } from "react-reader";
import { useRouter } from "next/router";

import ReaderOption from "./reader-option/ReaderOption";
import HighLightDrawer from "./high-light-drawer/HighLightDrawer";
import Snackbar from "@mui/material/Snackbar";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import uniqid from "uniqid";
import { BookDetailsContext } from "../context/providers/book-details.provider";
import {
  useMoralis,
  useMoralisQuery,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { pranaAddress } from "../config";
import Prana from "../artifacts/contracts/prana.sol/prana.json";
import axios from "axios";
import useMoralisInit from "../hooks/useMoralisInit";

export const Reader = ({ url }) => {
  const { bookDetails } = useContext(BookDetailsContext);

  const { user, Moralis } = useMoralisInit();
  const BookAnnotations = Moralis.Object.extend("BookAnnotations");
  const contractProcessor = useWeb3ExecuteFunction();

  let router = useRouter();
  const { tokenId } = router.query;

  const { fetch, isFetching, isLoading } = useMoralisQuery(
    BookAnnotations,
    (q) => q.equalTo("user", user).equalTo("tokenId", tokenId),
    // q.equalTo();
    [user, tokenId]
  );
  const tocRef = useRef(null);

  const [selections, setSelections] = useState([]);
  const [page, setPage] = useState("");
  const [location, setLocation] = useState(null);
  const [showPageBar, setShowPageBar] = useState(false);
  const [highlightDrawer, setHighlightDrawer] = useState(false);
  const [existingBookAnnotation, setExistingBookAnnotation] = useState(null);
  // const [book, setUrl] = useState(null);

  const handleShowDrawer = () => setHighlightDrawer(true);
  const handleDrawerClose = () => setHighlightDrawer(false);
  const handlePageSnackBarClose = () => setShowPageBar(false);

  const renditionRef = useRef(null);
  const saveBookOwnerToMoralis = async (
    newSelection,
    bookAnnotationInstance = existingBookAnnotation
  ) => {
    const bookAnnotations = bookAnnotationInstance
      ? bookAnnotationInstance
      : new BookAnnotations();
    bookAnnotations.set("user", user);
    bookAnnotations.set("tokenId", tokenId);
    bookAnnotations.set("annotations", newSelection);
    try {
      const bookAnnotationsResp = await bookAnnotations.save();
      setExistingBookAnnotation(bookAnnotationsResp);
    } catch (error) {
      console.log(error);
    }
  };

  const addAnnotation = (cfiRange, color = "red") => {
    if (renditionRef.current?.annotations) {
      renditionRef.current.annotations.add(
        "highlight",
        cfiRange,
        {},
        () => {},
        "hl",
        { fill: color, "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
      );
    }
  };

  const removeAnnotation = (cfiRange) => {
    renditionRef.current.annotations.remove(cfiRange, "highlight");
  };

  useEffect(() => {
    if (renditionRef.current) {
      function setRenderSelection(cfiRange, contents) {
        const newSelection = selections.concat({
          text: renditionRef.current.getRange(cfiRange).toString(),
          cfiRange,
          isEditing: true,
          annotation: "",
          id: uniqid(),
        });
        setSelections(newSelection);
        saveBookOwnerToMoralis(newSelection);
        handleShowDrawer();
        addAnnotation(cfiRange);

        contents.window.getSelection().removeAllRanges();
      }
      renditionRef.current.on("selected", setRenderSelection);
      return () => {
        renditionRef.current.off("selected", setRenderSelection);
      };
    }
  }, [setSelections, selections]);
  const onLocationChange = (epubcifi) => {
    setLocation(epubcifi);
    // to show the page number for current chapter
    if (renditionRef.current && tocRef.current) {
      const { displayed, href } = renditionRef.current.location.start;
      const chapter = tocRef.current.find((item) => item.href === href);
      setPage(
        `Page ${displayed.page} of ${displayed.total} in chapter ${
          chapter ? chapter.label : "n/a"
        }`
      );
    }
  };

  const toggleHighlightColor = (cfiRange) => {
    removeAnnotation(cfiRange);
    addAnnotation(cfiRange);
  };

  const showHeightlightedContent = (cfiRange) => {
    renditionRef.current.display(cfiRange);
    removeAnnotation(cfiRange);
    addAnnotation(cfiRange, "blue");
    setTimeout(() => {
      toggleHighlightColor(cfiRange);
    }, 250);
  };

  const deleteHighlight = (index, cfiRange) => {
    removeAnnotation(cfiRange);
    const newSelection = selections.filter((item, j) => j !== index);
    setSelections(newSelection);
    saveBookOwnerToMoralis(newSelection);
  };

  const handleSaveButtonClick = (annotation, index) => {
    const newSelectionObj = selections.map((selection, i) => {
      if (index === i) {
        return {
          ...selection,
          isEditing: false,
          annotation,
        };
      } else {
        return selection;
      }
    });
    setSelections(newSelectionObj);

    saveBookOwnerToMoralis(newSelectionObj);
  };

  const getAnnotationFromChain = async () => {
    const storedIpfsUrl = null;
    let options = {
      contractAddress: pranaAddress,
      functionName: "tokenURI",
      abi: Prana.abi.filter((fn) => fn.name === "tokenURI"),
      params: {
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
        onSuccess: (result) => {
          storedIpfsUrl = result;
        },
      });
      return storedIpfsUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ height: "100vh", position: "relative" }}>
        <ReactReader
          location={location}
          epubInitOptions={{ openAs: "epub" }}
          locationChanged={onLocationChange}
          url={url ? url : ""}
          getRendition={async (rendition) => {
            renditionRef.current = rendition;
            renditionRef.current.themes.default({
              "::selection": {
                background: "orange",
              },
            });
            let annotationDataFromChain = null;
            const ipfsUrl = await getAnnotationFromChain();
            if (ipfsUrl) {
              const ipfsMetaDataResponse = await axios.get(ipfsUrl);
              if (ipfsMetaDataResponse.status !== 200) {
                throw new Error("Something went wrong");
              } else {
                const metaDataFromApi = ipfsMetaDataResponse.data;
                annotationDataFromChain = {
                  ...metaDataFromApi,
                };
              }
            }

            fetch({
              onSuccess: async (result) => {
                const annotationForDb = result && result[0] ? result[0] : null;
                const dateFromDb = annotationForDb?.attributes?.updatedAt
                  ? new Date(annotationForDb?.attributes?.updatedAt).getTime()
                  : null;

                const shouldUpdateAnnotationInDb =
                  annotationDataFromChain &&
                  (dateFromDb <
                    new Date(annotationDataFromChain?.updatedAt).getTime() ||
                    !dateFromDb);
                if (shouldUpdateAnnotationInDb) {
                  await saveBookOwnerToMoralis(
                    annotationDataFromChain.annotations,
                    annotationForDb
                  );
                  console.log(
                    "annotationDataFromChain",
                    annotationDataFromChain
                  );
                  setSelections(annotationDataFromChain.annotations);
                  annotationDataFromChain?.annotations?.forEach((item) => {
                    addAnnotation(item.cfiRange);
                  });
                } else {
                  setExistingBookAnnotation(annotationForDb);
                  const storedSelection =
                    annotationForDb?.attributes?.annotations || [];
                  setSelections(storedSelection);
                  storedSelection.forEach((item) => {
                    addAnnotation(item.cfiRange);
                  });
                }
              },
              onError: (err) => {
                console.log("err", err);
              },
            });
          }}
          tocChanged={(toc) => (tocRef.current = toc)}
        />
      </div>
      <Snackbar
        open={showPageBar}
        onClose={handlePageSnackBarClose}
        message={page}
        autoHideDuration={2000}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handlePageSnackBarClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
      <HighLightDrawer
        open={highlightDrawer}
        handleDrawerClose={handleDrawerClose}
        showHeightlightedContent={showHeightlightedContent}
        deleteHighlight={deleteHighlight}
        highLightText={selections}
        handleSaveButtonClick={handleSaveButtonClick}
      />
      <ReaderOption
        handleShowDrawer={handleShowDrawer}
        showPageBar={showPageBar}
        setShowPageBar={setShowPageBar}
      />
    </>
  );
};
