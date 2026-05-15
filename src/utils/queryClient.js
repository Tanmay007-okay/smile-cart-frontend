import { QUERY_KEYS } from "constants/query";

import { QueryClient, QueryCache } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3600000,
    },
  },
});

// 1. Create the engine that knows how to save data to the browser
const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

// 2. Attach it to our React Query instance
persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
  maxAge: Infinity, // Keep this data forever (or until the user clears their browser cache)
  dehydrateOptions: {
    // 3. ONLY save the Countries and States APIs to the hard drive
    shouldDehydrateQuery: ({ queryKey }) =>
      [QUERY_KEYS.COUNTRIES, QUERY_KEYS.STATES].some((key) =>
        queryKey.includes(key)
      ),
  },
});

export default queryClient;
