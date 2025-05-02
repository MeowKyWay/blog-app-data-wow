'use client';

import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UnauthenticatedNotice from "../user-interface/UnauthenticateNotice";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const { username } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!username) {
            router.push("/sign-in");
        }
    }, [username, router]);

    if (!username) return UnauthenticatedNotice();

    return (<>{children}</>);
}