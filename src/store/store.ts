import { configureStore } from "@reduxjs/toolkit";
import billionairesReducer from "@/store/slices/oligarchs";
import billionaireReducer from "@/store/slices/oligarch";
import favoriteReducer from "@/store/slices/favorite";
import currencyReducer from "./slices/currency";

export const store = configureStore({
  reducer: {
    billionaires: billionairesReducer,
    billionaire: billionaireReducer,
    favorite: favoriteReducer,
    currency: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
