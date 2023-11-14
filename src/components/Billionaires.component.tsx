"use client";

import Image from "next/image";
import Autocomplete from "@/components/Autocomplete.component";

type BillionairesProps = {
  squareImage: string | undefined;
  netWorth: number | undefined;
};

export function Billionaires({ squareImage, netWorth }: BillionairesProps) {
  return (
    <>
      <div className="flex-center flex-col bg-gray-100 py-10">
        {squareImage ? (
          <Image
            src={squareImage}
            alt="avatar"
            className="rounded-full"
            width={124}
            height={124}
          />
        ) : null}
        <Autocomplete />
      </div>
      <div className="money-bar bg-gradient-to-b from-emerald-500 to-teal-400 text-white py-5 px-10 my-5 font-roboto font-semibold text-2xl text-center mt-10">
        {netWorth?.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
    </>
  );
}
