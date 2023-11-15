"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchBillionaire } from "@/store/slices/oligarch/operation";
import { Billionaires } from "@/components/Billionaires.component";
import { fetchBillionaires } from "@/store/slices/oligarchs/operation";
import { fetchGoods } from "@/store/slices/goods/operation";
import Good from "@/components/Good.component";
import Check from "@/components/Check";

export default function HomeId({ params }: any) {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.billionaire);
  const goods = useAppSelector((state) => state.goods.data);

  useEffect(() => {
    dispatch(fetchBillionaire(params.id));
  }, [params, dispatch]);

  useEffect(() => {
    dispatch(fetchBillionaires());
    dispatch(fetchGoods());
  }, []);

  return (
    <div className="container mx-auto">
      <Billionaires
        key={data?.id}
        netWorth={data?.netWorth}
        squareImage={data?.squareImage}
      />
      <div className="flex flex-wrap justify-between">
        {goods?.map((good) => (
          <Good
            image={good.image}
            name={good.name}
            price={good.price}
            key={good.id}
            id={good.id}
          />
        ))}
      </div>

      <Check />
    </div>
  );
}
