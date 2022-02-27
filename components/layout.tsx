import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { chain } from "../config";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main
        style={{
          backgroundColor: "#f5f5f5",
        }}
      >
        {children}
      </main>
    </>
  );
}
