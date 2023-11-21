"use client";

import Image from "next/image";
import Selector from "@/components/Selector.component";
import { useAppSelector } from "@/store/hooks";
import NetWorth from "./NetWorth.component";

type BillionairesProps = {
  squareImage: string;
  netWorth: number;
  id: string;
};

export function Billionaires({ squareImage, netWorth, id }: BillionairesProps) {
  const { fullPrice } = useAppSelector((state) => state.favorite);
  const { data } = useAppSelector((state) => state.billionaires);

  const remainingNetWorth: number = netWorth - fullPrice;

  return (
    <div className="flex items-center justify-between h-full sticky top-0">
      <NetWorth remainingNetWorth={remainingNetWorth} />
      <div className="reletive">
        {squareImage && (
          <Image
            src={squareImage}
            alt="avatar "
            className="rounded-full border-[3px] absolute ml-2 z-50 top-[3px]"
            width={100}
            height={100}
          />
        )}
        {data
          .filter((oligarch) => oligarch.id === id)
          .map((oligarch) => (
            <Selector selectedBillionaire={oligarch} key={oligarch.id} />
          ))}
      </div>
    </div>
  );
}
