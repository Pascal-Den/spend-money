import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeCurrency, clearCurrency } from "@/store/slices/oligarchs";
import { useState } from "react";

type NetWOrthProps = { 
  remainingNetWorth: number;
}

export default function NetWorth({ remainingNetWorth }: NetWOrthProps) {
  const {rates} = useAppSelector(state => state.currency)
  const dispatch = useAppDispatch(); 

  console.log(rates, 'rate');
  

  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD'); 
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);

     if (e.target.value === 'UAH' ) {
      'work'
      dispatch(changeCurrency({rates}))
    } else { 
      dispatch(clearCurrency({rates}))
    }
    

  };

  return (
    <div className="w-[600px] max-w-[700px] h-[106px] bg-[#3D4D55] text-white py-5 px-10 font-roboto font-semibold text-4xl rounded-xl flex-center">
      {remainingNetWorth.toLocaleString("en-US", {
        style: "currency",
        currency: selectedCurrency, 
        minimumFractionDigits: 0,
      })}
      <select value={selectedCurrency} onChange={handleCurrencyChange} className="ml-4 bg-[#3D4D55]">
        <option value="USD">USD</option>
        <option value="UAH">UAH</option>
      </select>
    </div>
  );
}