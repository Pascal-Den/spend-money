"use client";

import Image from "next/image";
import Selected from "@/components/Selected.component";
import { useAppSelector } from "@/store/hooks";

type BillionairesProps = {
  squareImage: string;
  netWorth: number;
};

export function Billionaires({ squareImage, netWorth }: BillionairesProps) {
  const { fullPrice } = useAppSelector((state) => state.favorite);

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
        <Selected />
      </div>
      <div className="money-bar bg-gradient-to-b from-emerald-500 to-teal-400 text-white py-5 px-10 my-5 font-roboto font-semibold text-2xl text-center mt-10">
        {(netWorth - fullPrice).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
    </>
  );
}
