import { useContext } from "react"; // 1. Import useContext

import { LeftArrow } from "neetoicons";
import { Typography } from "neetoui";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useHistory } from "react-router-dom";

import CartItemsContext from "../../contexts/CartItemsContext"; // 2. Import the Context

// 3. Remove cartItemsCount from the props list
const Header = ({ title, shouldShowBackButton = true, actionBlock }) => {
  const history = useHistory();

  // 4. Read the array directly from the global state!
  const [cartItems] = useContext(CartItemsContext);
  const cartItemsCount = cartItems.length;

  return (
    <div className="m-2">
      <div className="mx-6 mb-2 mt-6 flex items-end justify-between">
        <div className="flex items-center">
          {shouldShowBackButton && (
            <LeftArrow
              className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6 cursor-pointer"
              onClick={history.goBack}
            />
          )}
          <Typography style="h1" weight="semibold">
            {title}
          </Typography>
        </div>
        {/* 3. Render the Search Bar AND the Cart Icon */}
        <div className="flex items-end space-x-4">
          {actionBlock}
          <div className="flex flex-col">
            {/* Only show the badge if they actually have items! */}
            {cartItemsCount > 0 && (
              <span className="neeto-ui-border-black neeto-ui-rounded-full min-w-fit flex h-5 w-5 items-center justify-center self-end border bg-white p-1 text-xs font-bold">
                {cartItemsCount}
              </span>
            )}
            <AiOutlineShoppingCart size="2rem" />
          </div>
        </div>
      </div>
      <hr className="neeto-ui-bg-black mt-2 h-1" />
    </div>
  );
};

export default Header;
