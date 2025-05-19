"use client";

import TopNav from "../../components/Shared/TopNav";
import LeftSidebar from "../../components/Shared/LeftSideBar";

export default function Layout({ children }) {
  return (
    <main className="relative min-h-screen flex flex-col">
      <TopNav />
      <div className="flex flex-1 pt-16"> {/* pt-16 equals 64px for the top nav */}
        <LeftSidebar />
        <section className="flex flex-1 flex-col px-6 pb-6 pt-6 max-md:pb-14 sm:px-14 overflow-auto">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        {/* RightSidebar placeholder (replace with actual if needed) */}
        {/* <RightSidebar /> */}
      </div>
    </main>
  );
}
