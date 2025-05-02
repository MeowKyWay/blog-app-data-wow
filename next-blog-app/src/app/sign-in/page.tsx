'use client';

import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import TextField from "../components/user-interface/input/TextField";
import Button from "../components/user-interface/input/Button";
import Image from "next/image";

export default function signInPage() {

    const { login } = useAuth();
    const [username, setUsername] = useState<string>("");

    return (
        <div className="flex flex-row items-center h-screen bg-primary">
            <div className="flex flex-col items-center justify-center w-7/12">
                <div className="w-[47%] flex flex-col gap-[20px]">
                    <h1 className="text-primary-variant mb-[20px] inter.classname inter">Sign In</h1>
                    <TextField label="Username" placeholder="Username" value={username} onChange={(value) => setUsername(value)} type="text"></TextField>
                    <Button label="Sign In" onClick={() => login(username)}></Button>
                </div>
            </div>
            <div className="h-screen w-[44vw] bg-tertiary rounded-l-3xl flex flex-col items-center justify-center">
                <Image src="/images/a_board.png" alt="a_board"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-[47%] object-contain" />
                <div className="castoro italic text-[28px] text-primary-variant mt-4">
                    a Board
                </div>
            </div>
        </div >
    );
}