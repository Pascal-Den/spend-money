"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchBillionaire } from "@/store/slices/oligarch/operation";
import { Billionaires } from "@/components/Billionaires.component";
import { fetchBillionaires } from "@/store/slices/oligarchs/operation";

import Product from "@/components/Product.component";
import Check from "@/components/Check.component";
import { OligarchType } from "@/types";
import { fetchFavorite } from "@/store/slices/favorite/operation";
import { fetchRates } from "@/store/slices/currency";

export default function HomeId({ params }: {params: {id: string}}) {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.billionaire);
  const { favorite } = useAppSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(fetchBillionaire(params.id));
  }, [params, dispatch]);

  useEffect(() => {
    dispatch(fetchBillionaires());
    dispatch(fetchFavorite());
    dispatch(fetchRates())
  }, [dispatch]);


  const arrayData: OligarchType[] = [];
  if (data) {
    arrayData.push(data);
  }

  return (
  <div className="bg-[#9FA4A3]">
 
    <div className="max-w-[1200px] mx-auto py-10 ">
   
      {arrayData?.map((billionaire) => (
        <Billionaires
          key={billionaire.id}
          netWorth={billionaire.netWorth}
          squareImage={billionaire.squareImage}
        />
      ))}

      <div className="flex flex-wrap justify-between py-4">
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
  </div>
  );
}
