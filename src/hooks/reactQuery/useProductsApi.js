import { QUERY_KEYS } from "constants/query";

import productsApi from "apis/products";
import { useQuery } from "react-query";

// Hook 1: Fetch a single product by its slug
export const useShowProduct = (slug) =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productsApi.show(slug),
  });

// Hook 2: Fetch a list of products based on search parameters
export const useFetchProducts = (params) =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productsApi.fetch(params),
  });
