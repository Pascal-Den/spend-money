import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { OligarchType } from "@/types";
import { setProductClear } from "@/store/slices/favorite";
import SelectorOptions from "./SelectorOptions.component";

export default function Selector({
  selectedBillionaire,
}: {
  selectedBillionaire: OligarchType;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.billionaires);

  const handleSelectionChange = (person: OligarchType) => {
    router.push(`/${person.id}`);
    dispatch(setProductClear());
  };

  return (
    <div>
      <Listbox value={selectedBillionaire} onChange={handleSelectionChange}>
        <div className="relative  w-full ">
          <Listbox.Button className=" relative w-full  h-full rounded-lg bg-[#3D4D55] py-[33px] pl-40   pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm cursor-pointer text-white ">
            <span className="block truncate text-4xl">
              {selectedBillionaire?.personName}
            </span>
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
            <Listbox.Options className="absolute mt-1 max-h-300 w-full overflow-auto rounded-md bg-[#3D4D55] py-1 text-xl shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-xl">
              {data.map((person) => (
                <SelectorOptions key={person.id} person={person} />
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
