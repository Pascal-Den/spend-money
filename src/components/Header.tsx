import { useDispatch } from "react-redux";
import CustomListbox from "./Selector.component";
import {useState} from 'react'
import { changeYear } from "@/store/slices/oligarchs";

const years = ['2021', '2022', '2023'];

export default function Header () {
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState(years[0]);
  
  const handleYearsChange = (selectedValue: string) => { 
    if (selectedValue === selectedYear) return;
    setSelectedYear(selectedValue); 
    dispatch(changeYear(selectedValue))
  }
  return (
    <div className="w-full h-[106px] bg-[#3D4D55] mb-2 rounded lg text-4xl flex justify-center items-center text-white font-bold">Скільки міг потратити олігарх  в 
       <CustomListbox
          options={years}
          selectedValue={selectedYear}
          handleValueChange={handleYearsChange}
          width="sm:w-[140px] lg:w-[160px] phone:w-[160px]"
          height="rounded-lg py-2 pl-3 pr-10"
          isLarge={false}
          isCurrency={true}
          selectedItemText={selectedYear}
        />
    </div>
  )
}
