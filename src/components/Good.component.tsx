import React, { ChangeEvent } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { decrease, increase } from "@/store/slices/oligarch";

type GoodProps = {
  name: string;
  price: number;
  image: string;
  quantity: number;
};
export default function Good({ name, price, image, quantity }: GoodProps) {
  const dispatch = useAppDispatch();
  const test = (e: ChangeEvent<HTMLInputElement>) => {};
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
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
          onClick={() => dispatch(increase(price))}
        >
          Sell
        </button>
        <input
          className="border rounded py-2 px-4 w-[170px]"
          type="number"
          value={quantity}
          onChange={test}
          placeholder="Input field"
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2 "
          onClick={() => dispatch(decrease(price))}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
