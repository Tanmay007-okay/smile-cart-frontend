import { Button } from "neetoui";
// 1. Import Zustand and the shallow comparator
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

const AddToCart = ({ slug }) => {
  // 2. Use the Selector and pass `shallow` as the second argument
  const { isInCart, toggleIsInCart } = useCartItemsStore(
    (store) => ({
      isInCart: store.cartItems.includes(slug),
      toggleIsInCart: store.toggleIsInCart,
    }),
    shallow
  );

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleIsInCart(slug); // We now pass the slug directly into the store's function
  };

  return (
    <Button
      className="mt-4"
      label={isInCart ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
