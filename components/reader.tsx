import React, { useRef, useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import { useRouter } from "next/router";

import ReaderOption from "./reader-option/ReaderOption";
import HighLightDrawer from "./high-light-drawer/HighLightDrawer";
import Snackbar from "@mui/material/Snackbar";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import uniqid from "uniqid";

export const Reader = () => {
  let router = useRouter();
  const { url } = router.query;

  const tocRef = useRef(null);

  const [selections, setSelections] = useState([]);
  const [page, setPage] = useState("");
  const [location, setLocation] = useState(null);
  const [showPageBar, setShowPageBar] = useState(false);
  const [highlightDrawer, setHighlightDrawer] = useState(false);
  // const [book, setUrl] = useState(null);

  const handleShowDrawer = () => setHighlightDrawer(true);
  const handleDrawerClose = () => setHighlightDrawer(false);
  const handlePageSnackBarClose = () => setShowPageBar(false);

  const renditionRef = useRef(null);

  // useEffect(async () => {
  //   if (url) {
  //     const epubFile = await axios({
  //       url, //your url
  //       method: "GET",
  //       responseType: "blob",
  //     });
  //     setUrl(epubFile);
  //   }
  // }, [url]);

  useEffect(() => {
    if (renditionRef.current) {
      function setRenderSelection(cfiRange, contents) {
        setSelections(
          selections.concat({
            text: renditionRef.current.getRange(cfiRange).toString(),
            cfiRange,
            isEditing: true,
            annotation: "",
            id: uniqid(),
          })
        );
        handleShowDrawer();
        renditionRef.current.annotations.add(
          "highlight",
          cfiRange,
          { test: "test" },
          () => {},
          "hl",
          { fill: "red", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
        );
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
    renditionRef.current.annotations.remove(cfiRange, "highlight");
    renditionRef.current.annotations.add(
      "highlight",
      cfiRange,
      { test: "test" },
      () => {},
      "hl",
      { fill: "red", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
    );
  };

  const showHeightlightedContent = (cfiRange) => {
    renditionRef.current.display(cfiRange);
    renditionRef.current.annotations.remove(cfiRange, "highlight");
    renditionRef.current.annotations.add(
      "highlight",
      cfiRange,
      { test: "test" },
      () => {},
      "hl",
      {
        fill: "blue",
        "fill-opacity": "0.5",
        "mix-blend-mode": "multiply",
      }
    );
    setTimeout(() => {
      toggleHighlightColor(cfiRange);
    }, 250);
  };

  const deleteHighlight = (index, cfiRange) => {
    renditionRef.current.annotations.remove(cfiRange, "highlight");
    setSelections(selections.filter((item, j) => j !== index));
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
    localStorage.setItem("annotation", JSON.stringify(newSelectionObj));
  };

  return (
    <>
      <div style={{ height: "100vh", position: "relative" }}>
        <ReactReader
          location={location}
          epubInitOptions={{ openAs: "epub" }}
          locationChanged={onLocationChange}
          url={url ? url : ""}
          getRendition={(rendition) => {
            renditionRef.current = rendition;
            renditionRef.current.themes.default({
              "::selection": {
                background: "orange",
              },
            });
            const storedSelection = localStorage.getItem("annotation")
              ? JSON.parse(localStorage.getItem("annotation"))
              : [];
            setSelections(storedSelection);
            storedSelection.forEach((item) => {
              renditionRef.current.annotations.add(
                "highlight",
                item.cfiRange,
                { test: "test" },
                () => {},
                "hl",
                {
                  fill: "red",
                  "fill-opacity": "0.5",
                  "mix-blend-mode": "multiply",
                }
              );
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
