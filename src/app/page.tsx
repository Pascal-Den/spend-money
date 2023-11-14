"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/rinat-akhmetov");
  }, []);

  return <div className="container mx-auto"></div>;
}
