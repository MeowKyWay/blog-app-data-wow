'use client';

import { useState } from "react";
import Button from "./components/user-interface/input/Button";
import DropDown from "./components/user-interface/input/DropDown";
import { useAuth } from "./providers/AuthProvider";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Tag, tags } from "./lib/type";

export default function Home() {

  const { username } = useAuth();

  const [tag, setTag] = useState<Tag | null>(null);

  return (
    <div className="flex flex-col bg-background h-screen w-screen">
      <div className="flex flex-row bg-primary w-screen h-[72px] md:h-[60px] items-center px-4 md:px-8 justify-between">
        <text className="castoro text-primary-variant italic text-[24px] font-[400]">a Board</text>
        <Bars3Icon className="h-6 text-primary-variant" />
      </div>
      <div className="flex flex-col mt-12 px-4">
        <div className="flex flex-row items-center justify-between">
          <MagnifyingGlassIcon className="h-5 text-primary" />
          <div className="flex flex-row items-center gap-4"><DropDown<Tag>
            placeholder="Community"
            value={tag}
            options={tags}
            onSelect={setTag}
            toString={(tag) => tag ?? ""}
            className="w-48"
          />
            <Button label="Create +" onClick={() => { }} type="submit" className="font-semibold text-sm px-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
