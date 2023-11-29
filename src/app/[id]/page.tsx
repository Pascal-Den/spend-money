"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { Billionaires } from "@/components/Billionaires.component";
import { fetchBillionaires } from "@/store/slices/oligarchs/operation";

import Product from "@/components/Product.component";
import Check from "@/components/Check.component";
import { fetchFavorite } from "@/store/slices/favorite/operation";
import { fetchRates } from "@/store/slices/currency";
import Loading from "@/app/[id]/loading";
import Header from "@/components/Header";

export default function HomeId({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.billionaires);
  const { favorite, fullPrice, loading } = useAppSelector(
    (state) => state.favorite,
  );

  useEffect(() => {
    dispatch(fetchBillionaires());
    dispatch(fetchFavorite());
    dispatch(fetchRates());
  }, [dispatch]);

  return (
    <div className="bg-[#9FA4A3] min-h-screen">
      <Header />
      <div className="container mx-auto py-10">
        {data
          ?.filter((billionaire) => billionaire.id === params.id)
          .map((billionaire) => (
            <Billionaires
              key={billionaire.id}
              netWorth={billionaire.netWorth}
              id={billionaire.id}
              squareImage={billionaire.squareImage}
            />
          ))}

        <Loading loading={loading}>
          <div className="flex flex-wrap md:justify-between xl:justify-between py-4 lg:justify-around phone:justify-center">
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
        </Loading>
        <div className=" p-4">
          <Check />
        </div>
      </div>
    </div>
  );
}
