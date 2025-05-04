'use client';

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TextField from "../components/user-interface/input/TextField";
import DropDown from "../components/user-interface/input/DropDown";
import { Tag, tags } from "../lib/type";
import Button from "../components/user-interface/input/Button";
import { CreatePostModal } from "./CreatePostModal";
import { BlogList } from "../screens/home-screen/BlogList";

export default function BlogScreen() {

    const [search, setSearch] = useState("");
    const [tag, setTag] = useState<Tag | null>(null);

    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);

    return (
        <div className="h-full overflow-y-auto">
            <div className="flex flex-row m-4">
                <div className="flex flex-col gap-5 mt-12 px-4 flex-3">
                    <div className="flex flex-row items-center justify-between gap-4">
                        <button className="rounded-full bg-background hover:brightness-95 active:brightness-110 p-2 md:hidden" onClick={() => setShowSearchBar((prev) => !prev)}>
                            {!showSearchBar && <MagnifyingGlassIcon className="h-4.5 text-primary block md:hidden" />}
                            {showSearchBar && <XMarkIcon className="h-4.5 text-primary block md:hidden" />}
                        </button>
                        <TextField className={`${showSearchBar ? '' : 'hidden'} 
                    md:flex flex-1 w-full outline-(--selected)
                    transition-[width] duration-300 ease-in-out`}
                            placeholder="Search"
                            value={search}
                            onChange={setSearch}
                            type="text"
                            leadingIcon={<MagnifyingGlassIcon className="h-5 text-primary" />}
                        />
                        <div className={`${showSearchBar ? 'hidden' : 'flex'} md:flex flex-row items-center gap-4`}>
                            <DropDown<Tag>
                                placeholder="Community"
                                value={tag}
                                options={tags}
                                onSelect={setTag}
                                toString={(tag) => tag ?? ""}
                                backdropDimmed
                            />
                            <Button label="Create +" onClick={() => setShowCreatePostModal((prev) => !prev)} type="submit"
                                className={`${showSearchBar ? 'hidden' : 'block'} md:flex font-semibold text-sm px-4`} />
                        </div>
                        <CreatePostModal show={showCreatePostModal} onClose={() => setShowCreatePostModal(false)} />
                    </div>
                    <BlogList />
                </div>
                <div className="flex-1 hidden md:block"></div>
            </div>
        </div>
    )
}