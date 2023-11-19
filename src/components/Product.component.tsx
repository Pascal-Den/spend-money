import React, { ChangeEvent } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  onChangeNetWorth,
  setProductMinus,
  setProductToFavorite,

} from "@/store/slices/favorite";

type ProductProps = {
  name: string;
  price: number;
  image: string;
  id: string;
  quantity: number;
};



export default function Product({
  name,
  price,
  image,
  id,
  quantity,
}: ProductProps) {
  const dispatch = useAppDispatch();

  const netWorth = useAppSelector((state) => state.billionaire.data?.netWorth || 0);
  const fullPrice = useAppSelector((state) => state.favorite.fullPrice);

  const changeQuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;
    dispatch(
      onChangeNetWorth({
        id,
        quantity: newValue,
        netWorth, 
      })
    );
  };

  const increaseHandler = () => {
    dispatch(setProductMinus( id ));
  };

  const decreaseHandler = () => {
    dispatch(setProductToFavorite({ id, quantity, name, price, image }));
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
          className={`font-bold py-2 px-4 rounded mx-2 ${
            quantity <= 0
              ? "bg-gray-500 cursor-not-allowed text-gray-300"
              : "bg-red-500 hover:bg-red-700 text-white"
          }`}
          onClick={increaseHandler}
          disabled={quantity <= 0}
        >
          Sell
        </button>
        <input
          className="border rounded py-2 px-4 w-[170px] focus:appearance-none no-spinners"
          type="text"
          inputMode={"numeric"}
          property={"/[1-9]/g"}
          value={quantity}
          onChange={changeQuantityHandler}
          disabled={netWorth && fullPrice > netWorth && quantity === 0 ? true : false}
        />
        <button
          className={`font-bold py-2 px-4 rounded mx-2 ${
            netWorth && fullPrice + price <= netWorth
              ? "bg-green-500 hover:bg-green-700 text-white"
              : "bg-gray-500 cursor-not-allowed text-gray-300"
          }`}
          onClick={decreaseHandler}
          disabled={!(netWorth && fullPrice + price <= netWorth)}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
