import { Header, PageLoader, PageNotFound } from "components/Commons";
import AddToCart from "components/Commons/AddToCart";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Typography, Button } from "neetoui";
import { isNotNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import routes from "routes";
import withTitle from "utils/withTitle";

import Carousel from "./Carousel";

const Product = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  // The Magic of React Query
  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

  if (isError) return <PageNotFound />;

  if (isLoading) return <PageLoader />;

  // Destructure the data now that we know it successfully loaded
  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  return (
    <div className="flex h-screen flex-col">
      <Header title="Smile Cart" />
      <div className="mt-16 flex justify-center gap-16">
        {isNotNil(imageUrls) ? (
          <Carousel />
        ) : (
          <img alt={name} className="w-48" src={imageUrl} />
        )}
        <div className="w-3/5 space-y-4">
          <Typography className="mb-2" style="h4" weight="bold">
            {name}
          </Typography>
          <Typography>{description}</Typography>
          <Typography>MRP: ${mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: ${offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <div className="flex space-x-10">
            <AddToCart slug={slug} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label={t("buyNow")}
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTitle(Product);
