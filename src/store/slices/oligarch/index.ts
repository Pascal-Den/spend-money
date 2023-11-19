import { createSlice } from "@reduxjs/toolkit";
import { OligarchType } from "@/types";
import { fetchBillionaire } from "@/store/slices/oligarch/operation";

interface billionaireSliceState {
  data: OligarchType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  query: string | null;
}

const initialState: billionaireSliceState = {
  data: null,
  status: "idle",
  error: null,
  query: null,
};

const billionaireSlice = createSlice({
  name: "billionaire",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillionaire.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBillionaire.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBillionaire.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});


export default billionaireSlice.reducer;
