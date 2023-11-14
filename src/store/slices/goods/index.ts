import { createSlice } from "@reduxjs/toolkit";
import { GoodType } from "@/types";
import { fetchGoods } from "@/store/slices/goods/operation";

interface goodsSliceState {
  data: GoodType[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  query: string | null;
}

const initialState: goodsSliceState = {
  data: null,
  status: "idle",
  error: null,
  query: null,
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchGoods.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default goodsSlice.reducer;
