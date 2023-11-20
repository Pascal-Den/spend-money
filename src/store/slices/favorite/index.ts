import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrencyType, ProductChangeType, ProductType } from "@/types";
import { fetchFavorite } from "@/store/slices/favorite/operation";

type initialStateType = {
  favorite: ProductType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  fullPrice: number;
};

const initialState: initialStateType = {
  favorite: [],
  status: "idle",
  error: null,
  fullPrice: 0,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setProductToFavorite: (state, action: PayloadAction<ProductType>) => {
      const findItem = state.favorite.find(
        (obj) => obj.id === action.payload.id,
      );

      if (findItem) {
        findItem.quantity = findItem.quantity + 1;
      } else {
        state.favorite.push({
          ...action.payload,
          quantity: 0,
        });
      }

      state.fullPrice = state.favorite.reduce((accum, item) => {
        accum += item.price * item.quantity;
        return accum;
      }, 0);
    },

    setProductMinus: (state, action: PayloadAction<string>) => {
      const findItemIndex = state.favorite.findIndex(
        (obj) => obj.id === action.payload,
      );

      if (findItemIndex !== -1) {
        const currentItem = state.favorite[findItemIndex];

        currentItem.quantity = currentItem.quantity - 1;

        state.fullPrice = state.favorite.reduce((accum, item) => {
          accum += item.price * item.quantity;
          return accum;
        }, 0);
      }
    },

    onChangeNetWorth: (state, action: PayloadAction<ProductChangeType>) => {
      const { id, quantity, netWorth } = action.payload;

      const findItemIndex = state.favorite.findIndex((obj) => obj.id === id);
      if (findItemIndex === -1) return;

      const findItem = state.favorite[findItemIndex];

      const fullPrice = state.favorite.reduce((acc, item) => {
        acc +=
          item.id === id ? item.price * quantity : item.price * item.quantity;
        return acc;
      }, 0);

      const restQuantity = +Math.floor((netWorth - fullPrice) / findItem.price);

      findItem.quantity = restQuantity < 0 ? quantity + restQuantity : quantity;

      state.fullPrice = state.favorite.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
      }, 0);
    },
    changeCurrencyProduct: (state, action: PayloadAction<CurrencyType[]>) => {
      const firstItem = action.payload[0].rate;

      state.favorite = state.favorite.map((item) => ({
        ...item,
        price: item.price * firstItem,
      }));

      state.fullPrice = state.favorite.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
      }, 0);
    },
    clearCurrencyProduct: (state, action: PayloadAction<CurrencyType[]>) => {
      const firstItem = action.payload[0].rate;

      state.favorite = state.favorite.map((item) => ({
        ...item,
        price: item.price / firstItem,
      }));

      state.fullPrice = state.favorite.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
      }, 0);
    },
    setProductClear: (state) => {
      state.favorite = [];
      state.fullPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorite.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavorite.fulfilled, (state, action) => {
        state.favorite = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchFavorite.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.status = "failed";
      });
  },
});

export const {
  setProductToFavorite,
  setProductMinus,
  setProductClear,
  onChangeNetWorth,
  changeCurrencyProduct,
  clearCurrencyProduct,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
