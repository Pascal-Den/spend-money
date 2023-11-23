import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import SelectorOptions from "@/components/SelectorOptions.component";
import { OligarchType } from "@/types";

type CustomListboxProps = {
  options: OligarchType[] | string[];
  selectedValue: OligarchType | string;
  handleValueChange: (value: string & OligarchType) => void;
  width: string;
  height: string;
  span?: string;
  isLarge: boolean;
  isCurrency: boolean;
  selectedItemText: string;
};

const CustomListbox = ({
  options,
  selectedValue,
  handleValueChange,
  width,
  height,
  span,
  isLarge,
  isCurrency,
  selectedItemText,
}: CustomListboxProps) => {
  return (
    <Listbox value={selectedValue} onChange={handleValueChange}>
      <div
        className={`relative mt-1 ${isLarge ? "relative  w-full h-full" : ""}`}
      >
        <Listbox.Button
          className={`relative cursor-pointer text-center text-white bg-[#3D4D55] ${width} ${height} rounded-lg py-2 pl-3 pr-10 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 `}
        >
          <span className={`block truncate ${span}`}>{selectedItemText}</span>
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
          <Listbox.Options
            className={`absolute mt-1 max-h-300 ${
              isLarge ? "w-full" : "w-[140px]"
            } overflow-auto rounded-md bg-[#3D4D55] py-1 ${
              isCurrency ? "text-xl" : "text-base"
            } shadow-lg ring-1 ring-black/5 focus:outline-none`}
          >
            {options.map((item, index) => (
              <SelectorOptions
                key={isCurrency ? (item as OligarchType).id : index}
                person={item}
              />
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default CustomListbox;
