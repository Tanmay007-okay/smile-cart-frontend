import { useState } from "react";

import { Header, PageLoader } from "components/Commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import { Search } from "neetoicons";
import { Input, Pagination } from "neetoui"; // ✅ Import Pagination
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";
import withTitle from "utils/withTitle";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants"; // ✅ Import Constants
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX); // ✅ Add page state

  // ✅ Pass the pagination params to our hook
  const productsParams = {
    searchTerm: searchKey,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  // ✅ Extract totalProductsCount
  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

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
                setCurrentPage(DEFAULT_PAGE_INDEX); // ✅ Reset to page 1 on search
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
      <div className="flex flex-grow flex-col justify-between">
        <div className="grid grid-cols-4 gap-4 p-4">
          {products.map((product) => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
        {/* ✅ Add the Pagination Component at the bottom */}
        <div className="mb-5 self-end pr-4">
          <Pagination
            count={totalProductsCount}
            navigate={(page) => setCurrentPage(page)}
            pageNo={currentPage || DEFAULT_PAGE_INDEX}
            pageSize={DEFAULT_PAGE_SIZE}
          />
        </div>
      </div>
    </div>
  );
};

export default withTitle(ProductList);
