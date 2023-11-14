"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchBillionaire } from "@/store/slices/oligarch/operation";
import { Billionaires } from "@/components/Billionaires.component";
import { fetchBillionaires } from "@/store/slices/oligarchs/operation";

export default function Home({ params }: any) {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.billionaire);

  useEffect(() => {
    dispatch(fetchBillionaire(params.id));
  }, [params, dispatch]);

  useEffect(() => {
    dispatch(fetchBillionaires());
  }, []);

  return (
    <div className="container mx-auto">
      <Billionaires
        key={data?.id}
        netWorth={data?.netWorth}
        squareImage={data?.squareImage}
      />
    </div>
  );
}
