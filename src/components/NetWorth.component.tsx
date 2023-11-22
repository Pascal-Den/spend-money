import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeCurrency, clearCurrency } from "@/store/slices/oligarchs";
import { Fragment, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useRouter } from "next/navigation";
import {
  changeCurrencyProduct,
  clearCurrencyProduct,
} from "@/store/slices/favorite";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

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
        <Listbox
          value={selectedCurrency}
          onChange={(newValue: string) => handleCurrencyChange(newValue)}
        >
          <div className="relative mt-1  ">
            <Listbox.Button className="relative cursor-pointer text-center text-white bg-[#3D4D55] sm:w-[120px] lg:w-[140px] phone:w-[140px] rounded-lg py-2 pl-3 pr-10  shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ">
              <span className="block truncate">{selectedCurrency}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-[140px] overflow-auto bg-[#3D4D55] rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none phone:z-40 ">
                {currencies.map((currency, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-[#D3C3B9] text-white" : "text-white"
                      }`
                    }
                    value={currency}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {currency}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#B58863]">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
