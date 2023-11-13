"use client";

import { useEffect } from "react";
import { fetchBillionaires } from "@/store/slices/oligarch/operation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";

export function Billionaires() {
  const dispatch = useAppDispatch();
  const { data: billionaires, status } = useAppSelector(
    (state) => state.billionaires,
  );

  console.log(billionaires);
  useEffect(() => {
    dispatch(fetchBillionaires());
  }, []);

  return (
    <div>
      <Image
        src={billionaires?.personLists?.squareImage}
        alt="avatar"
        width={32}
        height={32}
        className="w-8 h-8 rounded-full"
      />
    </div>
  );
}
