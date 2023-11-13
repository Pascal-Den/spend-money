import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllOligarchs } from "@/axios";

export const fetchBillionaires = createAsyncThunk(
  "billionaires/fetchBillionaires",
  async (_, thunkAPI) => {
    try {
      const response = await axios.request(getAllOligarchs);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);
