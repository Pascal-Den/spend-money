import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/core/api";
import { ProductType } from "@/types";

export const fetchFavorite = createAsyncThunk(
  "products/fetchBillionaires",
  async (_, thunkAPI) => {
    try {
      const response = await api.get<ProductType[]>("/api/goods");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);
