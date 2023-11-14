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
  reducers: {
    increase: (state, action) => {
      if (state.data) {
        const updatedNetWorth = state.data.netWorth + action.payload;
        state.data = {
          ...state.data,
          netWorth: updatedNetWorth,
        };
      }
    },
    decrease: (state, action) => {
      if (state.data) {
        const updatedNetWorth = state.data.netWorth - action.payload;
        state.data = {
          ...state.data,
          netWorth: updatedNetWorth,
        };
      }
    },
    updateNetWorth: (state, action) => {
      if (state.data) {
        const updatedNetWorth = state.data.netWorth - action.payload;
        state.data = {
          ...state.data,
          netWorth: updatedNetWorth,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillionaire.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBillionaire.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBillionaire.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { increase, decrease, updateNetWorth } = billionaireSlice.actions;
export default billionaireSlice.reducer;
