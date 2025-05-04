'use client';

import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import SidebarMenu from "./SidebarMenu";
import { HomeScreen } from "./screens/home-screen/HomeScreen";

export type View = "home" | "myBlog";

export default function Home() {

  const [view, setView] = useState<View>("home");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col bg-background h-screen w-screen overflow-hidden">
      {/* static */}
      <div className="flex flex-row bg-primary w-screen h-[72px] md:h-[60px] items-center px-4 md:px-8 justify-between">
        <div className="castoro text-primary-variant italic text-[24px] font-[400]">a Board</div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden rounded-full p-2 bg-primary
          hover:brightness-90 active:brightness-110 transition duration-100 ease-in-out">
          <Bars3Icon className="h-6 text-primary-variant" />
        </button>
      </div>
      <div className="flex flex-row w-screen h-[calc(100vh-72px)] md:h-[calc(100vh-60px)] relative">
        <SidebarMenu onSelect={setView} selected={view} isOpen={isOpen} />
        <main className="flex flex-col w-full h-full bg-background p-4 overflow-y-scroll">
          {view === "home" && <HomeScreen />}
          {view === "myBlog" && <div>⚙️ MyBlog </div>}
        </main>
      </div>
    </div>
  );
}
