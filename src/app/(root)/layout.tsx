"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ThemeContext,
  ThemeContextProvider,
} from "../../../context/ThemeContext";
import LeftSidebar from "../../components/Shared/LeftSideBar";
import RightSideBar from "../../components/Shared/RightSideBar";
import TopNav from "../../components/Shared/TopNav";
import "../globals.css";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const navRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    function updateNavHeight() {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    }

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);

    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  if (!theme) {
    return <div>Loading...</div>;
  }

  return (
    <main
      className={`relative min-h-screen flex flex-col ${
        theme?.mode === "dark" ? "bg-black" : "bg-white"
      } `}
    >
      <div ref={navRef}>
        <TopNav />
      </div>

      <div
        className={`main-div flex flex-1 `}
        style={{
          marginTop: navHeight,
          height: `calc(100vh - ${navHeight}px)`,
          overflow: "hidden",
        }}
      >
        <LeftSidebar />
        <section className="flex flex-1 flex-col px-2 pb-6 pt-6 max-md:pb-14 scrollbar-hidden sm:px-4 overflow-auto">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeContextProvider>
  );
}
