"use client";

import TopNav from "../../components/Shared/TopNav";
import LeftSidebar from "../../components/Shared/LeftSideBar";

export default function Layout({ children }) {
  return (
    <main className="relative min-h-screen flex flex-col">
      <TopNav />
      <div
        className="main-div flex flex-1"
        style={{
          marginTop: "64px", 
          height: "calc(100vh - 64px)", 
          overflow: "hidden", 
        }}
      >
        <LeftSidebar />
        <section className="flex flex-1 flex-col px-6 pb-6 pt-6 max-md:pb-14 sm:px-14 overflow-auto">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        RIght sidebar
      </div>
    </main>
  );
}
