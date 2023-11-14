import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/core/api";

export const fetchBillionaire = createAsyncThunk(
  "billionaire/fetchBillionaire",
  async (id: string, thunkAPI) => {
    try {
      const response = await api.get(`/api/oligarchs/${id}`);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);
