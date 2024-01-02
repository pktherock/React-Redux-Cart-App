import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  addItem,
  checkOutAllCartItem,
  decreaseCartItem,
  increaseCartItem,
  removeItemFromCart,
} from "./cartThunk";

const initialState = {
  loading: false,
  cart: { total: 0, cartItems: [] },
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.cart = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // addItem reducers
    builder
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // increaseCartItem reducers
      .addCase(increaseCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(increaseCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(increaseCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // decreaseCartItem reducers
      .addCase(decreaseCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(decreaseCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(decreaseCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // removeItemFromCart reducers
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeItemFromCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // checkOutAllCartItem reducers
      .addCase(checkOutAllCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkOutAllCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(checkOutAllCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setError, setLoading, setInitialState } = cartSlice.actions;

export const useCartSelector = () => useSelector((state) => state.cart);

const cartReducer = cartSlice.reducer;
export default cartReducer;
