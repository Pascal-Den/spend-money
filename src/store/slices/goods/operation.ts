import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/core/api";

export const fetchGoods = createAsyncThunk(
  "goods/fetchBillionaires",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/goods");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);
