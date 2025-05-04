// components/SidebarMenu.tsx
'use client';

import { ReactNode, useState } from "react";
import { View } from "../page";
import { ArrowRightIcon, HomeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function SidebarMenu({ isOpen, onClose }: Props) {

    const router = useRouter();
    const path = usePathname();

    const iconClassName = "w-6 h-6 stroke-2";

    return (
        <>
            <div className={`w-[280px] md:flex-1 bg-primary pt-8 h-full absolute z-20
            transition-[right] duration-300 ease-in-out 
            top-0 ${isOpen ? 'right-0' : '-right-70'} h-full 
            md:static md:h-full md:!bg-(--background)`}>
                <nav className="flex flex-col gap-2">
                    <div className="flex items-center justify-center p-2 rounded-full md:hidden
                    hover:bg-black/5 hover:bg-black/10 w-10 h-10 ml-4"
                        onClick={onClose}>
                        <ArrowRightIcon className="w-6 h-6 stroke-2 text-primary-variant md:hidden" />
                    </div>
                    <SidebarMenuItem icon={(<HomeIcon className={iconClassName} />)}
                        label="Home" isSelected={path === '/blog'}
                        onClick={() => router.push('/blog/')} />
                    <SidebarMenuItem icon={(<PencilSquareIcon className={iconClassName} />)}
                        label="My Blog" isSelected={path === '/blog/my-blog'}
                        onClick={() => router.push('/blog/my-blog')} />
                </nav>
            </div>
            {isOpen && <div className={`md:hidden fixed inset-0 bg-black/50 z-10`} />}
        </>
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