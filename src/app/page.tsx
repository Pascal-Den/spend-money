"use client";

import { Billionaires } from "@/components/Billionaires.component";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchBillionaires } from "@/store/slices/oligarch/operation";

export default function Home() {
  const dispatch = useAppDispatch();
  const { data: billionaires, status } = useAppSelector(
    (state) => state.billionaires,
  );

  console.log(billionaires);
  useEffect(() => {
    dispatch(fetchBillionaires());
  }, []);
  return (
    <div className="container mx-auto">
      {billionaires.map((billionaire) => (
        <Billionaires
          id={billionaire.id}
          updatedAt={billionaire.updatedAt}
          createdAt={billionaire.createdAt}
          netWorth={billionaire.netWorth}
          personName={billionaire.personName}
          squareImage={billionaire.squareImage}
        />
      ))}
    </div>
  );
}
