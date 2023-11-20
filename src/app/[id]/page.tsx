"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { Billionaires } from "@/components/Billionaires.component";
import { fetchBillionaires } from "@/store/slices/oligarchs/operation";

import Product from "@/components/Product.component";
import Check from "@/components/Check.component";
import { fetchFavorite } from "@/store/slices/favorite/operation";
import { fetchRates } from "@/store/slices/currency";
import { fetchBillionaire } from "@/store/slices/oligarch/operation";

export default function HomeId({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.billionaires);
  const { favorite } = useAppSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(fetchBillionaire(params.id));
  }, [params, dispatch]);

  useEffect(() => {
    dispatch(fetchBillionaires());
    dispatch(fetchFavorite());
    dispatch(fetchRates());
  }, [dispatch]);

  return (
    <div className="bg-[#9FA4A3] h-[100vh]">
      <div className="max-w-[1200px] mx-auto py-10 ">
        {data
          ?.filter((billionaire) => billionaire.id === params.id)
          .map((billionaire) => (
            <Billionaires
              key={billionaire.id}
              netWorth={billionaire.netWorth}
              squareImage={billionaire.squareImage}
            />
          ))}

        <div className="flex flex-wrap justify-between py-4">
          {favorite?.map((product) => (
            <Product
              oligarchId={params.id}
              image={product.image}
              name={product.name}
              price={product.price}
              key={product.id}
              quantity={product.quantity}
              id={product.id}
            />
          ))}
        </div>
        <Check />
      </div>
    </div>
  );
}
