import { useDispatch } from "react-redux";
import CustomListbox from "./Selector.component";
import { useEffect, useState } from "react";
import { changeYear } from "@/store/slices/oligarchs";
import { useAppSelector } from "@/store/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { setProductClear } from "@/store/slices/favorite";

const years = ["2021", "2022", "2023"];

export default function Header() {
  const dispatch = useDispatch();

  const { data } = useAppSelector((state) => state.billionaires);
  const router = useRouter();
  const params = useSearchParams();
  const [selectedYear, setSelectedYear] = useState("2021");

  useEffect(() => {
    const storedYear = localStorage.getItem("selectedYear");
    if (storedYear && years.includes(storedYear)) {
      setSelectedYear(storedYear);
    }
  }, []);

  const handleYearsChange = (selectedValue: string) => {
    if (selectedValue === selectedYear) return;
    setSelectedYear(selectedValue);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedYear", selectedValue);
    }

    const firstMillionaireOfYear = data.find(
      (oligarch) => oligarch.year === selectedValue,
    );
    if (firstMillionaireOfYear) {
      const currency = params.get("currency");
      if (currency) {
        router.push(
          `/${firstMillionaireOfYear.id}?currency=${currency}&year=${selectedValue}`,
        );
      } else {
        router.push(`/${firstMillionaireOfYear.id}?year=${selectedValue}`);
      }

      dispatch(setProductClear());
    }
    dispatch(changeYear(selectedValue));
  };
  return (
    <div className="w-full h-[106px] bg-[#3D4D55] mb-2 rounded phone:text-xl lg:text-4xl phone:text-center md:text-2xl flex justify-center items-center text-white font-bold">
      Скільки могли витратити олігархи в:
      <CustomListbox
        options={years}
        selectedValue={selectedYear}
        handleValueChange={handleYearsChange}
        width="sm:w-[160px] lg:w-[180px] phone:w-[160px]"
        height="rounded-lg py-2 pl-3 pr-10"
        isLarge={false}
        isCurrency={true}
        selectedItemText={selectedYear}
      />
    </div>
  );
}
