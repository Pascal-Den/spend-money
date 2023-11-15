import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { decrease, increase } from "@/store/slices/oligarch";
import { setGoodMinus, setGoodToFavorite } from "@/store/slices/favorite";

type GoodProps = {
  name: string;
  price: number;
  image: string;
  id: string;
};
export default function Good({ name, price, image, id }: GoodProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(0);
  const [previousQuantity, setPreviousQuantity] = useState<number>(0);
  const { data } = useAppSelector((state) => state.billionaire);

  const changeQuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.value.length > 0 && e.target.value.charAt(0) === "0") {
      const newValue = parseInt(e.target.value, 10);
      setQuantity(newValue);
      setPreviousQuantity(newValue);
      return;
    }
    const newQuantity = Number(e.target.value);
    const difference = newQuantity - previousQuantity;

    setQuantity(newQuantity);

    if (newQuantity < 0) {
      return;
    }

    if (!data || newQuantity < 0 || newQuantity * price > data.netWorth) {
      return;
    }

    if (difference > 0) {
      dispatch(decrease(price * difference));
      dispatch(setGoodToFavorite({ id, name, price, quantity: newQuantity }));
    } else {
      dispatch(increase(price * Math.abs(difference)));
      dispatch(setGoodMinus({ id, quantity: newQuantity }));
    }

    setPreviousQuantity(newQuantity);
  };
  useEffect(() => {
    console.log(quantity);
  }, [quantity]);
  const increaseHandler = () => {
    dispatch(increase(price));
    dispatch(setGoodMinus({ id }));

    setQuantity((prevState) => prevState - 1);
    setPreviousQuantity((prevState) => prevState - 1);
  };

  const decreaseHandler = () => {
    dispatch(decrease(price));
    dispatch(setGoodToFavorite({ id, name, price }));
    setQuantity((prevState) => prevState + 1);
    setPreviousQuantity((prevState) => prevState + 1);
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
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-700"
          } text-white`}
          onClick={increaseHandler}
          disabled={quantity <= 0}
        >
          Sell
        </button>
        <input
          className="border rounded py-2 px-4 w-[170px] focus:appearance-none no-spinners"
          type="text"
          value={quantity}
          onChange={changeQuantityHandler}
          placeholder=""
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
