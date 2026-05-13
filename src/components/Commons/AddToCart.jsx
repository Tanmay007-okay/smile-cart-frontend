import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { Button } from "neetoui";
import { isNil } from "ramda";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ slug, availableQuantity }) => {
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedQuantity(1); // Set initial quantity to 1
  };

  // If it's not in the cart, show the standard button
  if (isNil(selectedQuantity)) {
    return <Button label="Add to cart" size="large" onClick={handleClick} />;
  }

  // If it IS in the cart, render the +/- counter!
  return <ProductQuantity availableQuantity={availableQuantity} slug={slug} />;
};

export default AddToCart;
