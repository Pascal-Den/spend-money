import { configureStore } from "@reduxjs/toolkit";
import billionairesReducer from "@/store/slices/oligarchs";
import billionaireReducer from "@/store/slices/oligarch";
import goodsReducer from "@/store/slices/goods";
import favoriteReducer from "@/store/slices/favorite";

export const store = configureStore({
  reducer: {
    billionaires: billionairesReducer,
    billionaire: billionaireReducer,
    goods: goodsReducer,
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
