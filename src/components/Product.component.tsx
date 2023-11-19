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
    

    const changeQuantityHandler =(e: ChangeEvent<HTMLInputElement>) => {
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
      <>
      <div className="max-w-[360px] rounded-lg overflow-hidden shadow-lg  bg-white">
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
          <div className="font-bold text-6xl text-green-700 ">{price}$</div>
        </div>
        </div>
        <div className="px-6 pt-4 pb-2 flex items-center justify-center">
          <button
            className={`font-bold py-2 px-4 rounded mx-2 ${
              quantity <= 0
                ? "font-medium rounded-lg text-sm px-5 py-2.5 bg-[#3D4D55]  cursor-not-allowed text-gray-300"
                : "text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br shadow-lg    font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            }`}
            onClick={increaseHandler}
            disabled={quantity <= 0}
          >
            -
          </button>
          <input
            className="border rounded py-2 px-4 w-[150px] focus:appearance-none no-spinners"
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
                ? "text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br shadow-lg    font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                : "font-medium rounded-lg text-sm px-5 py-2.5 bg-[#3D4D55]   cursor-not-allowed text-gray-300"
            }`}
            onClick={decreaseHandler}
            disabled={!(netWorth && fullPrice + price <= netWorth)}
          >
            +
          </button>
        </div>
      </div>
      </>
    );
  }
