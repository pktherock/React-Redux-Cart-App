import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon, HomeIcon } from "@heroicons/react/24/solid";
import { onSnapshot } from "firebase/firestore";

import { ShoppingCartIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";

import { useAuthSelector } from "../../slices/auth/authSlice";
import { logout } from "../../slices/auth/authThunk";
import {
  setError,
  setInitialState,
  setLoading,
  useCartSelector,
} from "../../features/cart/slices/cartSlice";
import { cartService } from "../../services";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useAuthSelector();
  const dispatch = useDispatch();

  const {
    cart: { cartItems },
  } = useCartSelector();

  const navigate = useNavigate();

  function handleLogoutBtnClick() {
    if (user) {
      dispatch(logout());
    }
    navigate("/auth/login");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    let unsubscribe;
    async function fetchAllCartItems(userId) {
      if (userId) {
        try {
          const cartRef = await cartService.getCartCollection(userId);
          unsubscribe = onSnapshot(cartRef, (snapShot) => {
            let total = 0;
            const cartItems = snapShot.docs.map((doc) => {
              total += doc.data().productInfo.price * doc.data().quantity;
              return {
                id: doc.id,
                ...doc.data(),
              };
            });
            dispatch(setInitialState({ cartItems, total }));
          });
        } catch (error) {
          dispatch(setError(error.code));
        } finally {
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setLoading(false));
      }
    }

    fetchAllCartItems(user?.uid);

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="w-full bg-white sticky top-0 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Link to="/">
              <HomeIcon className="h-6 w-6 cursor-pointer" />
            </Link>
          </span>
          <span className="font-bold">React Redux Fire Auth with CART</span>
        </div>
        {user && (
          <div className="space-x-4 items-center hidden lg:inline-flex">
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `inline-flex items-center ${isActive ? "text-green-400" : ""}`
              }
            >
              <ShoppingBagIcon className="h-10 w-10 text-blue-500 cursor-pointer hover:text-blue-400" />
              <span className="text-xl font-semibold">My orders</span>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `inline-flex items-center ${isActive ? "text-green-400" : ""}`
              }
            >
              <div className="relative">
                <ShoppingCartIcon className="w-10 h-10 text-purple-500 cursor-pointer hover:text-purple-400" />
                {/* Show cart count */}
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span className="text-xl font-semibold">Cart</span>
            </NavLink>
          </div>
        )}
        <div className="hidden lg:block">
          {user && <span className="font-bold pr-3">{user.displayName}</span>}
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={handleLogoutBtnClick}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
        <div className="lg:hidden">
          <Bars3Icon onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <Link to="/">
                        <HomeIcon className="h-6 w-6 cursor-pointer" />
                      </Link>
                    </span>
                    <span className="font-bold">React Fire Auth with CART</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="space-x-4 flex items-center justify-between px-5 py-2 shadow">
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      `inline-flex items-center ${
                        isActive ? "text-green-400" : ""
                      }`
                    }
                  >
                    <ShoppingBagIcon className="h-10 w-10 text-blue-500 cursor-pointer hover:text-blue-400" />
                    <span className="text-xl font-semibold">My orders</span>
                  </NavLink>

                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `inline-flex items-center ${
                        isActive ? "text-green-400" : ""
                      }`
                    }
                  >
                    <div className="relative">
                      <ShoppingCartIcon className="w-10 h-10 text-purple-500 cursor-pointer hover:text-purple-300" />
                      {/* Show cart count */}
                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-indigo-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold">
                          {cartItems.length}
                        </span>
                      )}
                    </div>
                    <span className="text-xl font-semibold">Cart</span>
                  </NavLink>
                </div>
                {user && <span>{user.displayName}</span>}
                <button
                  type="button"
                  className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={handleLogoutBtnClick}
                >
                  {user ? "Logout" : "Login"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
