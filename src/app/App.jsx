import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { RingLoader } from "react-spinners";

import appRoutes from "./app.routes";
import { useAuthSelector } from "./slices/auth/authSlice";
import { fetchUser } from "./slices/auth/authThunk";

import "./App.css";
import { alertService } from "./services";
import { useProductSelector } from "./features/product/slices/ProductSlice";
import { useCartSelector } from "./features/cart/slices/cartSlice";
import { useOrderSelector } from "./features/order/slices/orderSlice";

function App() {
  const {
    user,
    initLoading,
    loading: authLoading,
    error: authError,
  } = useAuthSelector();
  const { loading: productLoading, error: productError } = useProductSelector();
  const { loading: cartLoading, error: cartError } = useCartSelector();
  const { loading: orderLoading, error: orderError } = useOrderSelector();

  const dispatch = useDispatch();

  const loading = authLoading || productLoading || cartLoading || orderLoading;
  const error = authError || productError || cartError || orderError;

  useEffect(() => {
    // console.log("Fetching User info...");
    dispatch(fetchUser());
  }, [dispatch]);

  if (error) {
    alertService.error(error);
  }

  if (initLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 bg-black bg-opacity-20">
        <RingLoader
          loading={initLoading}
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          color="teal"
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p>Loading...</p>
      </div>
    );
  }

  if (user && !user.emailVerified) {
    return (
      <h1 className="text-3xl text-center">
        Please verify email first and do refresh (check your email for
        verification link)
      </h1>
    );
  }

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 bg-black bg-opacity-20">
          <RingLoader
            loading={loading}
            cssOverride={{
              display: "block",
              margin: "0 auto",
            }}
            color="teal"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p>Loading...</p>
        </div>
      )}
      <ToastContainer newestOnTop />
      <RouterProvider router={appRoutes} />
    </>
  );
}

export default App;
