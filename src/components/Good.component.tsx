import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { decrease, increase } from "@/store/slices/oligarch";

type GoodProps = {
  name: string;
  price: number;
  image: string;
};
export default function Good({ name, price, image }: GoodProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(0);
  const [previousQuantity, setPreviousQuantity] = useState<number>(0);

  const changeQuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    const difference = newQuantity - previousQuantity;

    setQuantity(newQuantity);

    if (difference > 0) {
      dispatch(decrease(price * difference));
    } else {
      dispatch(increase(price * Math.abs(difference)));
    }

    setPreviousQuantity(newQuantity);
  };

  const increaseHandler = () => {
    dispatch(increase(price));
    setQuantity((prevState) => prevState - 1);
  };

  const decreaseHandler = () => {
    dispatch(decrease(price));
    setQuantity((prevState) => prevState + 1);
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
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
          onClick={increaseHandler}
        >
          Sell
        </button>
        <input
          className="border rounded py-2 px-4 w-[170px]"
          type="number"
          value={quantity}
          onChange={changeQuantityHandler}
          placeholder="Input field"
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2"
          onClick={decreaseHandler}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
