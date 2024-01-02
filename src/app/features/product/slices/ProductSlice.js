import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { fetchProducts } from "./productThunk";

const initialState = {
  loading: false,
  error: null,
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch product reducers
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const useProductSelector = () => useSelector((state) => state.product);

const productReducer = productSlice.reducer;
export default productReducer;
