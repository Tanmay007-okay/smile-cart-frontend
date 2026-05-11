import { Typography } from "neetoui";
import { Link } from "react-router-dom";

const ProductListItem = ({ imageUrl, name, offerPrice, slug }) => (
  <Link
    className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4 transition-shadow duration-200 hover:shadow-lg"
    to={`/products/${slug}`}
  >
    <img alt={name} className="h-40 w-40 object-contain" src={imageUrl} />
    <Typography className="mt-2 text-center" weight="semibold">
      {name}
    </Typography>
    <Typography>${offerPrice}</Typography>
  </Link>
);

export default ProductListItem;
