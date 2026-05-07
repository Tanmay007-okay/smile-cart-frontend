import { useState, useEffect } from "react";

import axios from "axios";
import { Spinner, Typography } from "neetoui";
import { isNotNil, append } from "ramda";

import Carousel from "./Carousel";

const Product = () => {
  // 1. Set up our state variables
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 2. The function that talks to the backend
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2"
      );
      setProduct(response.data);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      // Whether it succeeds or fails, stop loading!
      setIsLoading(false);
    }
  };

  // 3. Run the fetch function exactly once when the page loads
  useEffect(() => {
    fetchProduct();
  }, []);

  // 4. If we are currently fetching, show the spinner and NOTHING ELSE.
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // 5. Destructure the data (and rename the snake_case variables to camelCase)
  const {
    name,
    description,
    mrp,
    offer_price: offerPrice,
    image_urls: imageUrls,
    image_url: imageUrl,
  } = product;

  // Calculate the discount
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  // 6. Render the actual UI
  return (
    <div className="px-6 pb-6">
      <div>
        <Typography className="py-2 text-4xl font-semibold" style="h1">
          {name}
        </Typography>
        <hr className="border-2 border-black" />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {/* If there are multiple images, show Carousel. Otherwise, just show the single image. */}
            {isNotNil(imageUrls) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
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
        </div>
      </div>
    </div>
  );
};

export default Product;
