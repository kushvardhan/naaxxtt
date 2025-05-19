"use client";
import TopNav from "../../components/Shared/TopNav";
import LeftSideBar from "../../components/Shared/LeftSideBar";

export default function Layout({ children }) {
  return (
    <main className={`relative`}>
      <TopNav />
      <div className="z-10 min-w-screen absolute top-[calc(100vh-TopNav)] flex">
        <LeftSideBar />
        <section className="flex flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl ">{children}</div>
        </section>
        RightSideBar
      </div>
    </main>
  );
}




