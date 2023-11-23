import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeCurrency, clearCurrency } from "@/store/slices/oligarchs";
import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useRouter } from "next/navigation";
import {
  changeCurrencyProduct,
  clearCurrencyProduct,
} from "@/store/slices/favorite";
import CustomListbox from "@/components/Selector.component";

type NetWorthProps = {
  remainingNetWorth: number;
  initialNetWorth: number;
};

export default function NetWorth({
  remainingNetWorth,
  initialNetWorth,
}: NetWorthProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currencies = ["USD", "UAH"];

  const { rates } = useAppSelector((state) => state.currency);

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const numberSpring = useSpring({
    number: remainingNetWorth,
    from: { number: initialNetWorth },
  });

  const handleCurrencyChange = (selectedValue: string) => {
    if (selectedValue === selectedCurrency) return;
    setSelectedCurrency(selectedValue);
    if (selectedValue === "UAH") {
      router.push(`?currency=${selectedValue}`);
      dispatch(changeCurrency(rates));
      dispatch(changeCurrencyProduct(rates));
    } else {
      router.push(`?currency=${selectedValue}`);
      dispatch(clearCurrency(rates));
      dispatch(clearCurrencyProduct(rates));
    }
  };

  return (
    <div className=" lg:w-[500px] xl:w-[600px] md:w-[360px] phone:w-full phone:rounded-none max-w-[700px] h-[106px] bg-[#3D4D55] text-white py-5 px-10 md:py-2 md:px-4 font-semibold text-4xl md:text-2xl rounded-xl lg:text-4xl flex justify-between items-center phone:text-2xl phone:p-[2px] phone:h-[60px] ss:text-xl">
      <div>
        {`${selectedCurrency === "USD" ? "$" : "₴"}`}
        <animated.span>
          {numberSpring.number.to((val) => Math.round(val).toLocaleString())}
        </animated.span>
      </div>
      <div>
        <CustomListbox
          options={currencies}
          selectedValue={selectedCurrency}
          handleValueChange={handleCurrencyChange}
          width="sm:w-[120px] lg:w-[140px] phone:w-[140px]"
          height="rounded-lg py-2 pl-3 pr-10"
          isLarge={false}
          isCurrency={true}
          selectedItemText={selectedCurrency}
        />
      </div>
    </div>
  );
}
