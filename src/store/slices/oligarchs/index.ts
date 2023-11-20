import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBillionaires } from "@/store/slices/oligarchs/operation";
import { CurrencyType, OligarchType } from "@/types";

interface billionairesSliceState {
  data: OligarchType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isUsd: boolean;
}

const initialState: billionairesSliceState = {
  data: [],
  status: "idle",
  error: null,
  isUsd: true,
};

const billionairesSlice = createSlice({
  name: "billionaires",
  initialState,
  reducers: {
    changeCurrency: (state, action: PayloadAction<CurrencyType[]>) => {
      const firstItem = action.payload[0].rate;

      if (state.data) {
        state.data = state.data.map((item) => ({
          ...item,
          netWorth: item.netWorth * firstItem,
        }));
      }

      state.isUsd = false;
    },
    clearCurrency: (state, action: PayloadAction<CurrencyType[]>) => {
      const firstItem = action.payload[0];
      if (state.data) {
        state.data = state.data.map((item) => ({
          ...item,
          netWorth: item.netWorth / firstItem.rate,
        }));
      }
      state.isUsd = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillionaires.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBillionaires.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBillionaires.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const { changeCurrency, clearCurrency } = billionairesSlice.actions;
export default billionairesSlice.reducer;
