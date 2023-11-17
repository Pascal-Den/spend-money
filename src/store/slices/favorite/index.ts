import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "@/types";
import { fetchFavorite } from "@/store/slices/favorite/operation";

type initialStateType = {
  favorite: ProductType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  fullPrice: number;
};

const initialState: initialStateType = {
  favorite: [],
  status: "idle",
  fullPrice: 0,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setProductToFavorite: (state, action) => {
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

    setProductMinus: (state, action) => {
      const { id, quantity } = action.payload;

      const findItemIndex = state.favorite.findIndex((obj) => obj.id === id);

      if (findItemIndex !== -1) {
        const currentItem = state.favorite[findItemIndex];

        if (quantity === 0) {
          state.favorite.splice(findItemIndex, 1);
        } else {
          currentItem.quantity = quantity
            ? Math.max(0, quantity)
            : currentItem.quantity - 1;
        }

        state.fullPrice = state.favorite.reduce((accum, item) => {
          accum += item.price * item.quantity;
          return accum;
        }, 0);
      }
    },

    onChangeNetWorth: (state, action) => {
      const { id, quantity, price, netWorth } = action.payload;

      const rest = netWorth && netWorth - state.fullPrice;

      const findItemIndex = state.favorite.findIndex((obj) => obj.id === id);

      if (findItemIndex === -1) return;

      const findItem = state.favorite[findItemIndex];

      console.log(rest, "rest");
      if (rest <= 0) {
        const totalPriceWithoutCurrent = state.favorite.reduce((acc, item) => {
          if (item.id !== id) {
            acc += item.price * item.quantity;
          }
          return acc;
        }, 0);

        const maxQuantityFromRest = Math.floor(
          (netWorth - totalPriceWithoutCurrent) / price,
        );
        findItem.quantity = Math.min(maxQuantityFromRest, quantity);
      } else {
        findItem.quantity = quantity;
      }

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
      .addCase(fetchFavorite.rejected, (state: any, action) => {
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export const {
  setProductToFavorite,
  setProductMinus,
  setProductClear,
  onChangeNetWorth,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
