"use client";

import Image from "next/image";
import { OligarchType } from "@/types";

export function Billionaires({
  createdAt,
  updatedAt,
  squareImage,
  id,
  personName,
  netWorth,
}: OligarchType) {
  return (
    <div>
      <Image
        src={squareImage}
        alt="avatar"
        width={32}
        height={32}
        className="w-8 h-8 rounded-full"
      />
    </div>
  );
}
