import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice";
import productReducer from "../features/product/slices/ProductSlice";
import cartReducer from "../features/cart/slices/cartSlice";
import orderReducer from "../features/order/slices/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
