import { configureStore } from "@reduxjs/toolkit";
import billionairesReducer from "@/store/slices/oligarchs";
import billionaireReducer from "@/store/slices/oligarch";
import goodsReducer from "@/store/slices/goods";

export const store = configureStore({
  reducer: {
    billionaires: billionairesReducer,
    billionaire: billionaireReducer,
    goods: goodsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
