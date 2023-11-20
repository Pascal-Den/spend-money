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
      <div className=" rounded-lg overflow-hidden shadow-lg  bg-white">
        <div className="flex-center">
          {image && (
            <Image
              className="mx-auto min-w-[150px] min-h-[150px] pt-6 pl-6"
              src={image}
              alt={name}
              width={150}
              height={150}
            />
          )}
          <div className="px-6 py-4 text-center min-w-[200px] w-full">
            <div className="font-bold text-xl mb-2">{name}</div>
            <div className="font-bold text-6xl text-green-700 ">
              {price.toFixed(0)} {isUsd ? "$" : "₴"}
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
