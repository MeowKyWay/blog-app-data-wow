// components/SidebarMenu.tsx
'use client';

import { ReactNode, useState } from "react";
import { View } from "../page";
import { HomeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

type Props = {
    isOpen: boolean;
};

export default function SidebarMenu({ isOpen }: Props) {

    const router = useRouter();
    const path = usePathname();

    const iconClassName = "w-6 h-6 stroke-2";

    return (
        <div className={`flex-1 bg-primary pt-8 h-full absolute z-10
            transition-[right] duration-300 ease-in-out 
            top-0 ${isOpen ? 'right-0' : '-right-70'} h-full 
            md:static md:h-full md:!bg-(--background)`}>
            <nav className="flex flex-col gap-2">
                <SidebarMenuItem icon={(<HomeIcon className={iconClassName} />)}
                    label="Home" isSelected={path === '/home'}
                    onClick={() => router.push('/home/')} />
                <SidebarMenuItem icon={(<PencilSquareIcon className={iconClassName} />)}
                    label="My Blog" isSelected={path === '/home/my-blog'}
                    onClick={() => router.push('/home/my-blog')} />
            </nav>
        </div>
    );
}

function SidebarMenuItem({
    icon,
    label,
    onClick,
    isSelected,
}: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
    isSelected?: boolean;
}) {
    return (
        <button
            onClick={() => onClick()}
            className={`py-2 px-6 ${isSelected ?
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