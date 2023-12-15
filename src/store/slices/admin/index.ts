import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type initialStateType = {
  isAuth: boolean;
};

const initialState: initialStateType = {
  isAuth: false,
};

export const fetchAuth = createAsyncThunk(
  "currency/fetchRates",
  async (data: { password: string }) => {
    const apiUrl = "http://localhost:3000/api/admin";
    const response = await axios.post(apiUrl, data);

    return response.data;
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.isAuth = true;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.isAuth = false;
      });
  },
});

export default adminSlice.reducer;
