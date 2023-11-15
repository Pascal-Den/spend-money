import { createSlice } from "@reduxjs/toolkit";
import { GoodType } from "@/types";

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
        findItem.quantity = action.payload.quantity
          ? action.payload.quantity
          : findItem.quantity + 1;
      } else {
        state.favorite.push({
          ...action.payload,
          quantity: action.payload.quantity ? action.payload.quantity : 1,
        });
      }
      state.fullPrice = state.favorite.reduce((accum, item) => {
        accum = accum + item.price * item.quantity;
        return accum;
      }, 0);
    },
    setGoodMinus: (state, action) => {
      const findItem = state.favorite.find(
        (obj) => obj.id === action.payload.id,
      );

      if (findItem) {
        console.log(findItem.quantity);
        if (findItem.quantity > 1) {
          findItem.quantity = action.payload.quantity
            ? action.payload.quantity
            : findItem.quantity - 1;
        } else {
          state.favorite = state.favorite.filter(
            (obj) => obj.id !== action.payload.id,
          );
        }

        state.fullPrice -= findItem.price;
      }
    },
    setGoodClear: (state) => {
      state.favorite = [];
      state.fullPrice = 0;
    },
  },
});

export const { setGoodToFavorite, setGoodMinus, setGoodClear } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
