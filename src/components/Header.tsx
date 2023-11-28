import { useDispatch } from "react-redux";
import CustomListbox from "./Selector.component";
import {useEffect, useState} from 'react'
import { changeYear } from "@/store/slices/oligarchs";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

const years = ['2021', '2022', '2023'];

export default function Header () {
  const dispatch = useDispatch();
 
  const { data } = useAppSelector((state) => state.billionaires);
  const router = useRouter()

  const [selectedYear, setSelectedYear] = useState('2021');

  useEffect(() => {
    const storedYear = localStorage.getItem('selectedYear');
    if (storedYear && years.includes(storedYear)) {
      setSelectedYear(storedYear);
    }
  }, [])

  const handleYearsChange = (selectedValue: string) => { 
    if (selectedValue === selectedYear) return;
    setSelectedYear(selectedValue); 
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedYear', selectedValue);
    }

    const firstMillionaireOfYear = data.find(oligarch => oligarch.year === selectedValue);
    if (firstMillionaireOfYear) {
      router.push(`/${firstMillionaireOfYear.id}`);
    }
    dispatch(changeYear(selectedValue)); 
   
  }
  return (
    <div className="w-full h-[106px] bg-[#3D4D55] mb-2 rounded lg text-4xl flex justify-center items-center text-white font-bold">Скільки міг потратити олігарх  в 
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
  )
}
