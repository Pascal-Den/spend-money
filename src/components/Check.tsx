import { useAppSelector } from "@/store/hooks";

export default function Check() {
  const { favorite, fullPrice } = useAppSelector((state) => state.favorite);

  if (fullPrice) {
    return (
      <div className="bg-gray-100 p-4 rounded-md my-6 max-w-[500px] mx-auto">
        <div className="text-xl font-bold mb-4 text-center">Your Receipt</div>
        {favorite.map((fav) => {
          if (fav.quantity > 0) {
            return (
              <div
                className="border-b border-gray-300 pb-2 mb-2 max-w-[600px] mx-auto"
                key={fav.id}
              >
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold">{fav.name}</div>
                  <div className="flex items-center">
                    <div className="text-sm text-gray-600 mr-4">
                      x{fav.quantity}
                    </div>
                    <div className="text-base font-medium">{fav.price}$</div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold">TOTAL</span>
          <div className="text-2xl font-bold">${fullPrice}</div>
        </div>
      </div>
    );
  }
}
