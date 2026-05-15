import { useState } from "react";

import { Header, PageLoader } from "components/Commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, Pagination } from "neetoui";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";
import withTitle from "utils/withTitle";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const queryParams = useQueryParams();

  // 1. Initialize variables from the URL instead of default local state
  const { page, pageSize, searchTerm = "" } = queryParams;
  const [searchKey, setSearchKey] = useState(searchTerm);

  const productsParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

  // 2. Debounce the function that pushes the new URL to the browser
  const updateQueryParams = useFuncDebounce((value) => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchTerm: value || null,
    };

    history.replace(buildUrl(routes.products.index, filterNonNull(params)));
  });

  const handlePageNavigation = (newPage) =>
    history.replace(
      buildUrl(
        routes.products.index,
        mergeLeft({ page: newPage, pageSize: DEFAULT_PAGE_SIZE }, queryParams)
      )
    );

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
              onChange={({ target: { value } }) => {
                updateQueryParams(value); // Updates URL
                setSearchKey(value); // Updates UI input instantly
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
        <div className="mb-5 self-end pr-4">
          <Pagination
            count={totalProductsCount}
            navigate={handlePageNavigation}
            pageNo={Number(page) || DEFAULT_PAGE_INDEX}
            pageSize={Number(pageSize) || DEFAULT_PAGE_SIZE}
          />
        </div>
      </div>
    </div>
  );
};

export default withTitle(ProductList);
