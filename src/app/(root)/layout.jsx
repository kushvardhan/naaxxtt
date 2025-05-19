"use client";

import React, { useEffect, useRef, useState } from "react";
import TopNav from "../../components/Shared/TopNav";
import LeftSidebar from "../../components/Shared/LeftSideBar";

export default function Layout({ children }) {
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

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

  return (
    <main className="relative min-h-screen flex flex-col">
      <div ref={navRef}>
        <TopNav />
      </div>

      <div
        className="main-div flex flex-1"
        style={{
          marginTop: navHeight,
          height: `calc(100vh - ${navHeight}px)`,
          overflow: "hidden",
        }}
      >
        <LeftSidebar />
        <section className="flex flex-1 flex-col px-6 pb-6 pt-6 max-md:pb-14 sm:px-14 overflow-auto">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        {/* Right sidebar if any */}
        hdfvfd
      </div>
    </main>
  );
}
