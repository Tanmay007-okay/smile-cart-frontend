import axios from "axios";

// Look how clean this is now!
const show = () => axios.get("products/infinix-inbook-2");

const productsApi = { show };

export default productsApi;
