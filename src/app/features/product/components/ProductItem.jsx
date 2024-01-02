import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { Card } from "../../../components";
import { useAuthSelector } from "../../../slices/auth/authSlice";
import { addItem, increaseCartItem } from "../../cart/slices/cartThunk";
import { useCartSelector } from "../../cart/slices/cartSlice";

function ProductItem({ productInfo }) {
  const {
    user: { uid },
  } = useAuthSelector();
  const {
    cart: { cartItems },
  } = useCartSelector();

  const { productName, price, productImg, id } = productInfo;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // if item is already there increase quantity by 1 and call update function
    const itemIndx = cartItems.findIndex(
      (cartItem) => cartItem.productInfo.id === id
    );

    if (itemIndx >= 0) {
      const { id } = cartItems[itemIndx];
      dispatch(increaseCartItem({ id, uid }));
    } else {
      dispatch(addItem({ item: productInfo, uid }));
    }
  };

  return (
    <Card>
      <img
        src={productImg}
        alt={`${productName} img`}
        className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px] p-1"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {productName}
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          debitis?
        </p>
        <div className="mt-5 flex items-center space-x-2">
          <span className="block text-sm font-semibold">Price : </span>
          <span className="text-xl font-bold">&#8377; {price}</span>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-blue-600 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </Card>
  );
}

ProductItem.propTypes = {
  productInfo: PropTypes.object.isRequired,
};

export default ProductItem;
