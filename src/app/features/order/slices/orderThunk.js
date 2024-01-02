import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderService } from "../../../services";

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async ({ uid }) => {
    const response = await orderService.getOrders(uid);
    // todo sort order in descending order (orderedAt)
    return response;
  }
);
