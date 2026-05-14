import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/Commons";
import { Search } from "neetoicons";
import { Input } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch();
      setProducts(products);
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
    <div className="flex h-screen flex-col">
      <div className="m-2">
        <Header
          shouldShowBackButton={false}
          title="Smile Cart"
          actionBlock={
            <Input
              placeholder={t("header.searchPlaceholder")}
              prefix={<Search />}
              type="search"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
                history.replace(
                  buildUrl(routes.products.index, {
                    search: e.target.value,
                  })
                );
              }}
            />
          }
        />
      </div>
      <div className="grid grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
