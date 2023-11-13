import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/core/api";

export const fetchBillionaires = createAsyncThunk(
  "billionaires/fetchBillionaires",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/oligarchs");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);
