"use client";

import React, { ChangeEvent } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  onChangeNetWorth,
  setProductMinus,
  setProductToFavorite,
} from "@/store/slices/favorite";
import UIButton from "@/components/Button.component";

type ProductProps = {
  name: string;
  price: number;
  image: string;
  id: string;
  quantity: number;
  oligarchId: string;
};

export default function Product({
  name,
  price,
  image,
  id,
  quantity,
  oligarchId,
}: ProductProps) {
  const dispatch = useAppDispatch();

  const oligarchs = useAppSelector((state) => state.billionaires.data);
  const { isUsd } = useAppSelector((state) => state.billionaires);
  const fullPrice = useAppSelector((state) => state.favorite.fullPrice);

  const oligarch = oligarchs.find((oligarch) => oligarch.id === oligarchId);

  const changeQuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!/^[0-9]*$/.test(newValue)) return;

    dispatch(
      onChangeNetWorth({
        id,
        quantity: +newValue,
        netWorth: oligarch?.netWorth ?? 0,
      }),
    );
  };

  const increaseHandler = () => {
    dispatch(setProductMinus(id));
  };

  const decreaseHandler = () => {
    dispatch(setProductToFavorite({ id, quantity, name, price, image }));
  };

  return (
    <>
      <div className="lg:w-[500px] sm:w-[360px] xl:w-[360px] rounded-lg overflow-hidden shadow-lg  bg-white mt-4">
        <div className="">
          <div className="pt-2">
            {image && (
              <Image
                className="mx-auto  w-[150px] h-[150px]"
                src={image}
                alt={name}
                width={150}
                height={150}
              />
            )}
          </div>
          <div className="px-3 py-2  min-w-[200px] w-full text-center">
            <div className="font-bold text-xl mb-2">{name}</div>
            <div className="font-bold text-4xl text-green-700 ">
              {Math.round(price).toLocaleString()} {isUsd ? "$" : "₴"}
            </div>
          </div>
        </div>
        <div className="px-6 pt-4 pb-2 flex items-center justify-center">
          <UIButton
            onClick={increaseHandler}
            disabled={quantity <= 0}
            gradient={true}
          >
            -
          </UIButton>
          <input
            className="border rounded py-2 px-4 w-[150px] focus:appearance-none no-spinners"
            type="text"
            value={quantity}
            onChange={changeQuantityHandler}
          />
          <UIButton
            onClick={decreaseHandler}
            disabled={
              !(oligarch?.netWorth && fullPrice + price <= oligarch.netWorth)
            }
            gradient={false}
          >
            +
          </UIButton>
        </div>
      </div>
    </>
  );
}
