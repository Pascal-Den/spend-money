import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { OligarchType } from "@/types";

type SelectorOptionsProps = {
  person: OligarchType | string;
};

export default function SelectorOptions({ person }: SelectorOptionsProps) {
  const personName = typeof person === "string" ? person : person.personName;
  return (
    <Listbox.Option
      key={personName}
      className={({ active }) =>
        `relative cursor-default select-none py-2 pl-10 pr-4 ${
          active ? "bg-[#D3C3B9] text-white" : "text-white"
        }`
      }
      value={person}
    >
      {({ selected }) => (
        <>
          <span
            className={`block truncate ${
              selected ? "font-medium" : "font-normal"
            }`}
          >
            {personName}
          </span>
          {selected ? (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#B58863]">
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
}
