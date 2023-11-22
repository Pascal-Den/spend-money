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
            className="rounded-full border-[3px] absolute md:ml-1 lg:ml-2 z-50  phone:w-[60px] phone:w-[60px]  md:w-[88px] md:h-[88px]  lg:w-[100px] lg:h-[100px] md:top-[13px] lg:top-[7px]  phone:top-[66.5px] phone:ml-1"
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
