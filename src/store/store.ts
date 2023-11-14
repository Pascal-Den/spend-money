import { configureStore } from "@reduxjs/toolkit";
import billionairesReducer from "@/store/slices/oligarchs";
import billionaireReducer from "@/store/slices/oligarch";

export const store = configureStore({
  reducer: {
    billionaires: billionairesReducer,
    billionaire: billionaireReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
