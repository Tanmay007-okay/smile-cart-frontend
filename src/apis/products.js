import axios from "axios";

// Update this line to accept and pass `params`
const fetch = (params) => axios.get("products", { params });

const show = (slug) => axios.get(`products/${slug}`);

const productsApi = { show, fetch };

export default productsApi;
