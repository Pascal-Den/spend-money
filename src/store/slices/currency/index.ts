import { CurrencyType } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type initialStateType = {
  rates: CurrencyType[];
  loading: boolean;
  error: any;
};

const initialState: initialStateType = {
  rates: [],
  loading: false,
  error: null,
};

export const fetchRates = createAsyncThunk("currency/fetchRates", async () => {
  try {
    const apiUrl =
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=USD";
    const response = await axios.get(apiUrl);

    return response.data;
  } catch (error) {
    console.error("Error fetching dollar exchange rate:", error);
    throw error;
  }
});

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.loading = false;
        state.rates = action.payload;
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default currencySlice.reducer;
