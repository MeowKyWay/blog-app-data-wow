'use client';

import { useAuth } from "./providers/AuthProvider";

export default function Home() {

  const { username } = useAuth();

  return (
    <div className="flex flex-col bg-background h-screen w-screen">
      <div className="flex flex-row bg-primary w-screen h-[72px] md:h-[60px] items-center px-4 md:px-8 justify-between">
        <text className="castoro text-primary-variant italic text-[24px] font-[400]">a Board</text>
        <div className="flex flex-row gap-4">
          <text className="text-primary-variant text-[16px] font-[400]">Home</text>
          <text className="text-primary-variant text-[16px] font-[400]">About</text>
          <text className="text-primary-variant text-[16px] font-[400]">Contact</text>
      </div>
      {username == null ? "guest" : username}
    </div>
  );
}
