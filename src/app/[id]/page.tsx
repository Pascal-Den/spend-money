"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchBillionaire } from "@/store/slices/oligarch/operation";
import { Billionaires } from "@/components/Billionaires.component";
import { fetchBillionaires } from "@/store/slices/oligarchs/operation";

import Product from "@/components/Product.component";
import Check from "@/components/Check";
import { OligarchType } from "@/types";
import { fetchFavorite } from "@/store/slices/favorite/operation";

export default function HomeId({ params }: any) {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.billionaire);
  const { favorite, fullPrice } = useAppSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(fetchBillionaire(params.id));
  }, [params, dispatch]);

  useEffect(() => {
    dispatch(fetchBillionaires());
    dispatch(fetchFavorite());
  }, []);

  useEffect(() => {}, []);

  const arrayData: OligarchType[] = [];
  if (data) {
    arrayData.push(data);
  }

  return (
    <div className="container mx-auto">
      {arrayData?.map((billionaire) => (
        <Billionaires
          key={billionaire.id}
          netWorth={billionaire.netWorth}
          squareImage={billionaire.squareImage}
        />
      ))}

      <div className="flex flex-wrap justify-between">
        {favorite?.map((product) => (
          <Product
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
  );
}
