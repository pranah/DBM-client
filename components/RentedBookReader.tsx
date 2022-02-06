import React, { useState } from "react";
import { ReactReader } from "react-reader";
import { useRouter } from "next/router";

export const RentedBookReader = () => {
  let router = useRouter();
  const { url } = router.query;
  // And your own state logic to persist state
  const [location, setLocation] = useState(null);
  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);
  };
  console.log("url", url);
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <ReactReader
        url={url ? url : ""}
        epubInitOptions={{ openAs: "epub" }}
        location={location}
        locationChanged={locationChanged}
      />
    </div>
  );
};
