import { useState } from "react";

import { Header, PageLoader } from "components/Commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import { Search } from "neetoicons";
import { Input } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";
import withTitle from "utils/withTitle";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [searchKey, setSearchKey] = useState("");

  // The Magic of React Query (No useQuery URL hook needed!)
  const { data: { products = [] } = {}, isLoading } = useFetchProducts({
    searchTerm: searchKey,
  });

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

export default withTitle(ProductList);
