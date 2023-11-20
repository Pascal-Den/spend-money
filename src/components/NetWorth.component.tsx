import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeCurrency, clearCurrency } from "@/store/slices/oligarchs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  changeCurrencyProduct,
  clearCurrencyProduct,
} from "@/store/slices/favorite";

type NetWOrthProps = {
  remainingNetWorth: number;
};

export default function NetWorth({ remainingNetWorth }: NetWOrthProps) {
  const { rates } = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();

  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const router = useRouter();
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
    if (e.target.value === "UAH") {
      router.push(`?currency=${e.target.value}`);
      dispatch(changeCurrency(rates));
      dispatch(changeCurrencyProduct(rates));
    } else {
      router.push(`?currency=${e.target.value}`);
      dispatch(clearCurrency(rates));
      dispatch(clearCurrencyProduct(rates));
    }
  };

  return (
    <div className="w-[600px] max-w-[700px] h-[106px] bg-[#3D4D55] text-white py-5 px-10 font-roboto font-semibold text-4xl rounded-xl flex-center">
      {remainingNetWorth.toLocaleString("en-US", {
        style: "currency",
        currency: selectedCurrency,
        minimumFractionDigits: 0,
      })}
      <select
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        className="ml-4 bg-[#3D4D55]"
      >
        <option value="USD">USD</option>
        <option value="UAH">UAH</option>
      </select>
    </div>
  );
}
