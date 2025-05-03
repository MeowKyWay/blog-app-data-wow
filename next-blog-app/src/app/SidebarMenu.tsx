// components/SidebarMenu.tsx
'use client';

import { ReactNode, useState } from "react";
import { View } from "./page";
import { HomeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

type Props = {
    onSelect: (view: View) => void;
    selected: View;
    isOpen: boolean;
};

export default function SidebarMenu({ onSelect, selected, isOpen }: Props) {

    const onClick = (view: View) => {
        onSelect(view);
    }

    const iconClassName = "w-6 h-6 stroke-2";

    return (
        <div className={`w-70 bg-primary pt-8 h-full absolute z-10
            transition-[right] duration-300 ease-in-out 
            top-0 ${isOpen ? 'right-0' : '-right-70'} h-full 
            md:static md:h-full md:!bg-(--background)`}>
            <nav className="flex flex-col gap-2">
                <SidebarMenuItem icon={(<HomeIcon className={iconClassName} />)} label="Home" value="home" selectedView={selected} onClick={onClick} />
                <SidebarMenuItem icon={(<PencilSquareIcon className={iconClassName} />)} label="My Blog" value="myBlog" selectedView={selected} onClick={onClick} />
            </nav>
        </div>
    );
}

function SidebarMenuItem({
    icon,
    label,
    value,
    onClick,
    selectedView,
}: {
    icon: ReactNode;
    label: string;
    value: View;
    onClick: (view: View) => void;
    selectedView: View;
}) {
    return (
        <button
            onClick={() => onClick(value)}
            className={`py-2 px-6 ${selectedView === value ?
                "text-primary-variant md:!text-(--color-primary) font-[800]" :
                "text-secondary-variant md:!text-(--color-primary) font-[500] "}
            flex flex-row gap-3 items-center py-2 px-3
            hover:bg-black/10 hover:bg-opacity-10
            `}
        >
            {icon && <span>{icon}</span>}
            {label}
        </button>
    );
}