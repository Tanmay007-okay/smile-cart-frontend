import { Button } from "neetoui";

const AddToCart = ({ isInCart, toggleIsInCart }) => {
  const handleClick = (e) => {
    // These two lines stop the browser from clicking the <Link> card underneath the button!
    e.stopPropagation();
    e.preventDefault();
    toggleIsInCart(); // Use the walkie-talkie to tell the Boss!
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
