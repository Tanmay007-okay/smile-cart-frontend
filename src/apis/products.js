import axios from "axios";

// 1. Get all products
const fetch = () => axios.get("products");

// 2. Get a specific product by its slug
const show = (slug) => axios.get(`products/${slug}`);

const productsApi = { show, fetch };

export default productsApi;
