
import { Listbox  } from "@headlessui/react";
import { CheckIcon  } from "@heroicons/react/20/solid";
import {  useAppSelector } from "@/store/hooks";
import { OligarchType } from "@/types";



type SelectorOptionsProps = { 
  person: OligarchType
}

export default function SelectorOptions({person}: SelectorOptionsProps) { 
  const { data: selectedBillionaire } = useAppSelector(
    (state) => state.billionaire,
  );
  
  return(<Listbox.Option
    key={person.id}
    className={({ active }) =>
      `relative cursor-default select-none py-2 pl-10 pr-4 ${
        active ? "bg-[#D3C3B9] text-white" : "text-white"
      }`
    }
    value={person}
  >
    {() => (
      <>
        <span
          className={`block truncate ${
            person.id === selectedBillionaire?.id
              ? "font-medium"
              : "font-normal"
          }`}
        >
          {person.personName}
        </span>
        {person.id === selectedBillionaire?.id ? (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#D3C3B9]">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
      </>
    )}
  </Listbox.Option>)
}