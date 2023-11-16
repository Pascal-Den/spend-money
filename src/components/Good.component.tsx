import React, { ChangeEvent } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  onChangeNetWorth,
  setGoodMinus,
  setGoodToFavorite,
} from "@/store/slices/favorite";

type GoodProps = {
  name: string;
  price: number;
  image: string;
  id: string;
  quantity: number;
};

export default function Good({ name, price, image, id, quantity }: GoodProps) {
  const dispatch = useAppDispatch();
  const { fullPrice } = useAppSelector((state) => state.favorite);
  const netWorth = useAppSelector((state) => state.billionaire.data?.netWorth);

  const changeQuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const rest = netWorth && netWorth - Number(value) * price;

    console.log(rest);
    if (value.length === 0) {
      dispatch(onChangeNetWorth({ id, quantity: 0 }));
      return;
    }
    if (value.length > 0 && value.charAt(0) === "0") {
      const newValue = parseInt(value, 10);
      dispatch(
        onChangeNetWorth({
          id,
          quantity: newValue,
          netWorth,
          rest,
        }),
      );
    } else {
      const newValue = parseInt(value, 10);
      dispatch(onChangeNetWorth({ id, quantity: newValue, netWorth, rest }));
    }
  };

  const increaseHandler = () => {
    dispatch(setGoodMinus({ id }));
  };

  const decreaseHandler = () => {
    dispatch(setGoodToFavorite({ id, name, price }));
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {image && (
        <Image
          className="mx-auto min-w-[200px] min-h-[200px]"
          src={image}
          alt={name}
          width={200}
          height={200}
        />
      )}
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2">{name}</div>
        <div>{price}$</div>
      </div>

      <div className="px-6 pt-4 pb-2 flex items-center justify-center">
        <button
          className={
            "font-bold py-2 px-4 rounded mx-2 bg-red-500 hover:bg-red-700 text-white"
          }
          onClick={increaseHandler}
        >
          Sell
        </button>
        <input
          className="border rounded py-2 px-4 w-[170px] focus:appearance-none no-spinners"
          type="text"
          value={quantity}
          onChange={changeQuantityHandler}
        />
        <button
          className={`font-bold py-2 px-4 rounded mx-2 ${
            netWorth && fullPrice + price < netWorth
              ? "bg-green-500 hover:bg-green-700 text-white"
              : "bg-gray-500 cursor-not-allowed text-gray-300"
          }`}
          onClick={decreaseHandler}
          disabled={!(netWorth && fullPrice + price < netWorth)}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
