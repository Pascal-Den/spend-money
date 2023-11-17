import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/core/api";
import { OligarchType } from "@/types";

export const fetchBillionaires = createAsyncThunk(
  "billionaires/fetchBillionaires",
  async (_, thunkAPI) => {
    try {
      const response = await api.get<OligarchType[]>("/api/oligarchs");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);
