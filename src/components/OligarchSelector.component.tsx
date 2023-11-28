import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { OligarchType } from "@/types";
import { setProductClear } from "@/store/slices/favorite";
import CustomListbox from "@/components/Selector.component";

export default function Selector({
  selectedBillionaire,
}: {
  selectedBillionaire: OligarchType;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
const {year } = useAppSelector(state => state.billionaires)

  const { data } = useAppSelector((state) => state.billionaires);

  const filtredData = data.filter(oligarch => oligarch.year === year)

  const handleSelectionChange = (person: OligarchType) => {
    if (person.id === selectedBillionaire.id) return;
    router.push(`/${person.id}`);
    dispatch(setProductClear());
  };

  return (
    <div>
      <CustomListbox
        options={filtredData}
        selectedValue={selectedBillionaire}
        handleValueChange={handleSelectionChange}
        width="lg:w-[500px] lg:pl-20 relative xl:w-[574px] md:w-[360px] lg-w-[500px] md:h-[106px] phone:w-[380px] phone:mt-0 rounded-lg bg-[#3D4D55] py-[33px] xl:pl-40 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300  cursor-pointer text-white phone:rounded-t-none phone:border-t-[1px] phone:p-[2px] phone:pr-[34px] phone:h-[66px] ss:w-[320px] md:pr-[25px]"
        height="xl:w-[574px] md:w-[360px] md:h-[106px] phone:w-[380px] phone:mt-0 rounded-lg bg-[#3D4D55] py-[33px] xl:pl-40 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300  cursor-pointer text-white phone:rounded-t-none phone:border-t-[1px] phone:p-[2px] phone:pr-[34px] phone:h-[66px] ss:w-[320px]"
        isLarge={true}
        span="lg:text-4xl font-semibold flex justify-end md:text-2xl  phone:text-2xl items-center"
        isCurrency={false}
        selectedItemText={selectedBillionaire?.personName}
      />
    </div>
  );
}
