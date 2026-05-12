import AddToCart from "components/AddToCart";
import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";
// 1. Import the button

const ProductListItem = ({
  imageUrl,
  name,
  offerPrice,
  slug,
  // 2. Receive the walkie-talkie props from the Boss
  isInCart,
  toggleIsInCart,
}) => (
  <Link
    className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4 transition-shadow duration-200 hover:shadow-lg"
    to={buildUrl(routes.products.show, { slug })}
  >
    <img alt={name} className="h-40 w-40 object-contain" src={imageUrl} />
    <Typography className="mt-2 text-center" weight="semibold">
      {name}
    </Typography>
    <Typography>${offerPrice}</Typography>
    {/* 3. Give the walkie-talkie to the button */}
    <AddToCart isInCart={isInCart} toggleIsInCart={toggleIsInCart} />
  </Link>
);

export default ProductListItem;
