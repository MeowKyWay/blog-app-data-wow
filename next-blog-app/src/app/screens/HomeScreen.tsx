import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DropDown from "../components/user-interface/input/DropDown";
import { Tag, tags } from "../lib/type";
import Button from "../components/user-interface/input/Button";
import { useState } from "react";

export function HomeScreen() {

    const [tag, setTag] = useState<Tag | null>(null);

    return (
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
    )
}