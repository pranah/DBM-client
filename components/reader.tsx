import React, { useRef, useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import { useRouter } from "next/router";

// import AroundtheWorldin28Languages from 'public/Around the World in 28 Languages.epub'
// import AlicesAdventuresinWonderland from '/Alices Adventures in Wonderland.epub'
// import famouspaintings from '/famouspaintings.epub'
// import Sway from '/Sway.epub'

// const books = {
//     AlicesAdventuresinWonderland, AroundtheWorldin28Languages, famouspaintings, Sway
// }

export const Reader = () => {
  let router = useRouter();
  const { url } = router.query;

  const tocRef = useRef(null);

  const [selections, setSelections] = useState([]);
  const [page, setPage] = useState("");
  const [location, setLocation] = useState(null);

  const renditionRef = useRef(null);
  useEffect(() => {
    if (renditionRef.current) {
      function setRenderSelection(cfiRange, contents) {
        setSelections(
          selections.concat({
            text: renditionRef.current.getRange(cfiRange).toString(),
            cfiRange,
          })
        );

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
  return (
    <>
      <div style={{ height: "100vh", position: "relative" }}>
        <ReactReader
          location={location}
          epubInitOptions={{ openAs: "epub" }}
          locationChanged={onLocationChange}
          url={url ? url.toString() : ""}
          getRendition={(rendition) => {
            renditionRef.current = rendition;
            renditionRef.current.themes.default({
              "::selection": {
                background: "orange",
              },
            });

            setSelections([]);
          }}
          tocChanged={(toc) => (tocRef.current = toc)}
        />
      </div>
      {/* <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 1, backgroundColor: 'white' }}>
                Selection:
                <ul>
                    {selections.map(({ text, cfiRange }, i) => (
                        <li key={i}>
                            {text} <button onClick={() => {
                                renditionRef.current.display(cfiRange)
                            }}>Show</button>
                            <button onClick={() => {
                                renditionRef.current.annotations.remove(cfiRange, 'highlight')
                                setSelections(selections.filter((item, j) => j !== i))
                            }}>x</button>
                        </li>
                    ))}
                </ul>
            </div> */}
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          left: "1rem",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {page}
      </div>
    </>
  );
};
