import { createSlice } from "@reduxjs/toolkit";
import { GoodType } from "@/types";
import { fetchFavorite } from "@/store/slices/favorite/operation";

type initialStateType = {
  favorite: GoodType[];
  fullPrice: number;
};

const initialState: initialStateType = {
  favorite: [],
  fullPrice: 0,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setGoodToFavorite: (state, action) => {
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

    setGoodMinus: (state, action) => {
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
    // onGoodChange: (state, action) => {
    //   const findItem = state.favorite.find(
    //     (obj) => obj.id === action.payload.id,
    //   );
    //
    //   if (findItem) {
    //     findItem.quantity = action.payload.quantity;
    //   }
    // },

    onChangeNetWorth: (state, action) => {
      const { id, quantity, price, netWorth } = action.payload;
      const rest = action.payload.rest;

      const findItemIndex = state.favorite.findIndex((obj) => obj.id === id);

      if (findItemIndex === -1) return;

      const findItem = state.favorite[findItemIndex];

      if (rest / findItem.price < 1) {
        const newQuantity = Math.floor(rest / findItem.price);
        findItem.quantity = newQuantity;
      } else {
        findItem.quantity = quantity;
      }

      const calculatedPrice = state.favorite.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
      }, 0);

      state.fullPrice = calculatedPrice;
    },
    setGoodClear: (state) => {
      state.favorite = [];
      state.fullPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorite.pending, (state) => {})
      .addCase(fetchFavorite.fulfilled, (state, action) => {
        state.favorite = action.payload;
      })
      .addCase(fetchFavorite.rejected, (state: any, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  setGoodToFavorite,
  setGoodMinus,
  setGoodClear,
  onChangeNetWorth,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
