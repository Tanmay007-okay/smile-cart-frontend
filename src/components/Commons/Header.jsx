import { LeftArrow } from "neetoicons";
import { Typography } from "neetoui";
import { keys } from "ramda";
import { AiOutlineShoppingCart } from "react-icons/ai";
// 1. Swap Context for Zustand
import { useHistory, Link } from "react-router-dom";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";

const Header = ({ title, shouldShowBackButton = true, actionBlock }) => {
  const history = useHistory();

  // 2. Use the Selector to grab exactly what we need
  const cartItemsCount = useCartItemsStore(
    (store) => keys(store.cartItems).length
  );

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
          <Link className="flex flex-col items-center" to={routes.cart}>
            {cartItemsCount > 0 && (
              <span className="neeto-ui-border-black neeto-ui-rounded-full min-w-fit flex h-5 w-5 items-center justify-center self-end border bg-white p-1 text-xs font-bold">
                {cartItemsCount}
              </span>
            )}
            <AiOutlineShoppingCart size="2rem" />
          </Link>
        </div>
      </div>
      <hr className="neeto-ui-bg-black mt-2 h-1" />
    </div>
  );
};

export default Header;
