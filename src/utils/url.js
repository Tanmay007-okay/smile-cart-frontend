import { keysToSnakeCase } from "neetocist";
import { stringify } from "qs";
import { isEmpty, toPairs, pipe, omit } from "ramda";

export const buildUrl = (route, params) => {
  const placeHolders = [];

  // 1. Find dynamic segments (like :slug) and replace them with the actual value
  toPairs(params).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeHolders.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  // 2. Take any leftover parameters and turn them into a query string (?key=value)
  const queryParams = pipe(
    omit(placeHolders),
    keysToSnakeCase,
    stringify
  )(params);

  // 3. Return the final, safe URL string
  return isEmpty(queryParams) ? route : `${route}?${queryParams}`;
};
