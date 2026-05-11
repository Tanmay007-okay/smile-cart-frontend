import { Typography } from "neetoui";
import { Link } from "react-router-dom";
// Import our new tools
import routes from "routes";
import { buildUrl } from "utils/url";

const ProductListItem = ({ imageUrl, name, offerPrice, slug }) => (
  <Link
    className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4 transition-shadow duration-200 hover:shadow-lg"
    // Use buildUrl instead of template strings!
    to={buildUrl(routes.products.show, { slug })}
  >
    <img alt={name} className="h-40 w-40 object-contain" src={imageUrl} />
    <Typography className="mt-2 text-center" weight="semibold">
      {name}
    </Typography>
    <Typography>${offerPrice}</Typography>
  </Link>
);

export default ProductListItem;
