import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

import OrderItem from "./OrderItem";
import { Container } from "../../../components";
import { useOrderSelector } from "../slices/orderSlice";
import { useAuthSelector } from "../../../slices/auth/authSlice";
import { fetchOrders } from "../slices/orderThunk";

function Order() {
  const { orders } = useOrderSelector();
  const {
    user: { uid },
  } = useAuthSelector();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders({ uid }));
  }, [dispatch, uid]);

  return (
    <Container>
      <ArrowUturnLeftIcon
        onClick={() => navigate("/products")}
        className="h-12 w-12 p-3 font-bold bg-white border rounded-full shadow-xl hover:shadow-md hover:bg-gray-400"
      />
      <h1 className="my-2 text-center text-3xl font-bold">Your Orders</h1>
      {orders.map((order) => (
        <OrderItem key={order.id} orderInfo={order} />
      ))}
    </Container>
  );
}

export default Order;
