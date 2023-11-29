import { useAppSelector } from "@/store/hooks";
import CheckPrice from "./CheckPrice.component";

export default function Check() {
  const { favorite, fullPrice } = useAppSelector((state) => state.favorite);
  const { isUsd } = useAppSelector((state) => state.billionaires);

  if (fullPrice) {
    return (
      <div className="bg-white  p-4 rounded-md my-6 max-w-[500px] mx-auto ">
        <div className="text-2xl font-bold mb-4 text-center">Your Receipt</div>
        {favorite.map((fav) => (
          <CheckPrice
            key={fav.id}
            id={fav.id}
            price={fav.price}
            name={fav.name}
            quantity={fav.quantity}
          />
        ))}
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold">TOTAL</span>
          <div className="text-2xl font-bold text-green-700">
            {isUsd ? "$" : "₴"}
            {fullPrice.toLocaleString()}
          </div>
        </div>
      </div>
    );
  }
}
