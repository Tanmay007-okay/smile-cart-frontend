import axios from "axios";

// 1. The specific API call
const show = () =>
  axios.get(
    "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2"
  );

// 2. Package it into an object
const productsApi = { show };

// 3. Export the object
export default productsApi;
