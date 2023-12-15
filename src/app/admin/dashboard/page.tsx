"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchFavorite } from "@/store/slices/favorite/operation";
import { DashBoardTableComponent } from "@/components/DashBoardTable.component";

function Dashboard() {
  const dispatch = useAppDispatch();

  const { favorite } = useAppSelector((state) => state.favorite);

  console.log(favorite);

  useEffect(() => {
    dispatch(fetchFavorite());
  }, []);

  return (
    <div className="container mx-auto">
      {favorite.map((product) => (
        <DashBoardTableComponent key={product.id} {...product} />
      ))}
    </div>
  );
}

// export default ProtectedRoute(Dashboard);
export default Dashboard;
