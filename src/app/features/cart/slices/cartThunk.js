import { createAsyncThunk } from "@reduxjs/toolkit";

import { alertService, cartService } from "../../../services";

export const addItem = createAsyncThunk(
  "cart/addItem",
  async ({ item, uid }) => {
    const response = await cartService.addItem(item, uid);
    alertService.success("Successfully added to the cart!");
    return response;
  }
);

export const increaseCartItem = createAsyncThunk(
  "cart/increaseCartItem",
  async ({ id, uid }) => {
    await cartService.increaseItem(id, uid);
    alertService.success("Item Increased successfully!");
    return null; // as subscriber automatically notified
  }
);

export const decreaseCartItem = createAsyncThunk(
  "cart/decreaseCartItem",
  async ({ id, uid }) => {
    await cartService.decrementItem(id, uid);
    alertService.success("Item Decreased successfully!");
    return null; // as subscriber automatically notified
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ id, uid }) => {
    await cartService.deleteItem(id, uid);
    alertService.success("Item Deleted successfully!");
    return null; // as subscriber automatically notified
  }
);

export const checkOutAllCartItem = createAsyncThunk(
  "cart/checkOutCartItem",
  async ({ uid, cart }) => {
    await cartService.checkOutCartItems(uid, cart);
    alertService.success("Order successfully placed!");
    return null; // as subscriber automatically notified
  }
);
