import axios from "axios";
import { keysToCamelCase } from "neetocist";

// 1. Automatically translate snake_case to camelCase
const transformResponseKeysToCamelCase = (response) => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

// 2. Intercept the incoming package, translate it, and throw away the outer box
const responseInterceptors = () => {
  axios.interceptors.response.use((response) => {
    transformResponseKeysToCamelCase(response);

    return response.data; // Now we don't have to type .data in our components!
  });
};

// 3. Set the default postage stamps
const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

// 4. Initialize everything at once
export default function initializeAxios() {
  axios.defaults.baseURL =
    "https://smile-cart-backend-staging.neetodeployapp.com/";
  setHttpHeaders();
  responseInterceptors();
}
