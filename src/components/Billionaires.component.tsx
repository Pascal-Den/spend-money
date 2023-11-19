  "use client";

  import Image from "next/image";
  import Selector from "@/components/Selector.component";
  import { useAppSelector } from "@/store/hooks";
import NetWorth from "./NetWorth.component";

  type BillionairesProps = {
    squareImage: string;
    netWorth: number;
  };

  export function Billionaires({ squareImage, netWorth }: BillionairesProps) {
    const { fullPrice } = useAppSelector((state) => state.favorite);
    
    const remainingNetWorth: number = netWorth - fullPrice;
 

    return (
        <div className="flex items-center justify-between h-full sticky top-0   py-2">
         <NetWorth remainingNetWorth={remainingNetWorth}/>
          <div className="reletive">
            {squareImage && (
               <Image
               src={squareImage}
                alt="avatar "
               className="rounded-full border-[3px] absolute top-[11px] ml-2 z-50"
               width={100}
               height={100}
               />
            )}
            <Selector />
          </div>
        </div>
    );
  }
