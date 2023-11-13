import { createSlice } from "@reduxjs/toolkit";
import { fetchBillionaires } from "@/store/slices/oligarch/operation";
import { BillionaireFull } from "@/types";

interface billionairesSliceState {
  data: BillionaireFull;
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
  reducers: {},
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
        state.error = action.error.message;
      });
  },
});

export default billionairesSlice.reducer;