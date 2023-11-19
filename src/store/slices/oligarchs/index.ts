import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchBillionaires } from "@/store/slices/oligarchs/operation";
import { OligarchType } from "@/types";

interface billionairesSliceState {
  data: OligarchType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: billionairesSliceState = {
  data: [],
  status: "idle",
  error: null,
};

const billionairesSlice = createSlice({
  name: "billionaires",
  initialState,
  reducers: {
    changeCurrency: (state, action: PayloadAction<any>) => {
      const firstItem = action.payload.rates[0];
      if (state.data) {
        state.data = state.data.map((item) => ({
          ...item,
          netWorth: item.netWorth * firstItem.rate,
        }));
      }
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

export const { changeCurrency } = billionairesSlice.actions;
export default billionairesSlice.reducer;
