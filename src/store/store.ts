import { configureStore } from "@reduxjs/toolkit";
import billionairesReducer from "@/store/slices/oligarchs";
import favoriteReducer from "@/store/slices/favorite";
import currencyReducer from "./slices/currency";
import adminReducer from "./slices/admin";

export const store = configureStore({
  reducer: {
    billionaires: billionairesReducer,
    favorite: favoriteReducer,
    currency: currencyReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
