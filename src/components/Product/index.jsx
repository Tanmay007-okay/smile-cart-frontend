import { useState, useEffect } from "react";

import productsApi from "apis/products";
// 2. Import our newly built shared components!
import { Header, PageLoader, PageNotFound } from "components/Commons";
// import { AddToCart } from "components/Commons";
import AddToCart from "components/Commons/AddToCart";
import { Typography } from "neetoui";
import { isNotNil, append } from "ramda";
import { useParams } from "react-router-dom"; // 1. Import useParams to read the URL

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 3. We need an error state to handle bad URLs
  const [isError, setIsError] = useState(false);

  // 4. Extract the dynamic slug from the address bar (e.g., "infinix-inbook-2")
  const { slug } = useParams();

  const fetchProduct = async () => {
    try {
      // 5. Pass that slug directly to our API Mailroom!
      const response = await productsApi.show(slug);
      setProduct(response);
    } catch {
      // 6. If the backend says "Product not found", trigger our error state
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]); // It's good practice to tell useEffect to re-run if the slug changes

  // 7. Render our fallback states using our clean common components
  if (isLoading) return <PageLoader />;

  if (isError) return <PageNotFound />;

  // Destructure the data now that we know it successfully loaded
  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      {/* 8. Look how clean this is! Our shared Header handles the title and the Back button */}
      <Header title={name} />
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt={name} className="w-48 object-contain" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: ${mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: ${offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <AddToCart slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default Product;
