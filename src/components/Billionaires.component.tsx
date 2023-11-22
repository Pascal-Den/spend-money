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
    <div className=" flex items-center justify-between h-full sticky top-0 phone:flex-col">
      <NetWorth
        remainingNetWorth={remainingNetWorth}
        initialNetWorth={netWorth}
      />
      <div className="reletive">
        {squareImage && (
          <Image
            src={squareImage}
            alt="avatar "
            className="rounded-full border-[3px] absolute md:ml-1 lg:ml-2 z-50 top-[3px] md:w-[80px] phone:w-[60px] phone:w-[60px] md:h-[80px] lg:w-[100px] lg:h-[100px] md:top-[13px] lg:top-[3px]  phone:top-[63px] phone:ml-1"
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
