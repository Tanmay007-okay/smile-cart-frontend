import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/Commons";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await productsApi.fetch();
      // Since our Axios Mailroom extracts response.data,
      // the products array is right inside response.products
      setProducts(response.products);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col">
      {/* Our shared header with the back button turned off! */}
      <Header shouldShowBackButton={false} title="Smile Cart" />
      {/* The grid that displays our product cards */}
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
