'use client';

import Button from "@/app/components/user-interface/input/Button";
import DropDown from "@/app/components/user-interface/input/DropDown";
import TextField from "@/app/components/user-interface/input/TextField";
import { Tag, tags } from "@/app/lib/type";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CreatePostModal } from "../CreatePostModal";
import { MyBlogList } from "./MyBlogList";

export default function MyBlog() {

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
                    <MyBlogList search={search} tag={tag} />
                </div>
                <div className="flex-1 hidden md:block"></div>
            </div>
        </div>
    )
}