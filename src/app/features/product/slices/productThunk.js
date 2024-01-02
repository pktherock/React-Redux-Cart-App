import { createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "../../../services";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const products = await productService.getAllProduct();
    return products;
  }
);