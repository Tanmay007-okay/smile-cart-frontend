import { useContext } from "react";

import { Button } from "neetoui";
import { without } from "ramda";

import CartItemsContext from "../../contexts/CartItemsContext"; // 1. Tune into the radio station!

// 2. We no longer need the toggle functions passed as props, just the product's slug
const AddToCart = ({ slug }) => {
  // 3. Grab the global state directly from Context!
  const [cartItems, setCartItems] = useContext(CartItemsContext);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // 4. Update the global state directly
    setCartItems((prevCartItems) =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );
  };

  return (
    <Button
      className="mt-4"
      label={cartItems.includes(slug) ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
