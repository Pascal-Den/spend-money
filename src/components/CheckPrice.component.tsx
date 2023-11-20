import { useAppSelector } from "@/store/hooks";

type CheckPriceProps = {
  quantity: number;
  id: string;
  price: number;
  name: string;
};

export default function CheckPrice({
  quantity,
  id,
  price,
  name,
}: CheckPriceProps) {
  const { isUsd } = useAppSelector((state) => state.billionaires);
  if (quantity > 0)
    return (
      <div
        className="border-b border-gray-300 pb-2 mb-2 max-w-[600px] mx-auto"
        key={id}
      >
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">{name}</div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-4">x{quantity}</div>
            <div className="text-base font-medium">
              {price.toFixed(0)}
              {isUsd ? "$" : "₴"}
            </div>
          </div>
        </div>
      </div>
    );
}
