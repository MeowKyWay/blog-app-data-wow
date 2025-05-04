'use client'

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="rounded-full p-2 bg-selected h-11 w-11
            hover:brightness-90 active:brightness-110 transition duration-100 ease-in-out">
            <ArrowLeftIcon className="text-primary" />
        </button>
    );
}