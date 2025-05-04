'use client';

import { redirect } from "next/navigation";

export type View = "home" | "myBlog";

export default function Home() {
  redirect("/blog");
}
