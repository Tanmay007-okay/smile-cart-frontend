import axios from "axios";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { evolve } from "ramda";

// --- 1. RESPONSE INTERCEPTORS (Incoming from Server) ---
const transformResponseKeysToCamelCase = (response) => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use((response) => {
    transformResponseKeysToCamelCase(response);

    return response.data;
  });
};

// --- 2. REQUEST INTERCEPTORS (Outgoing to Server) ---
const requestInterceptors = () => {
  axios.interceptors.request.use(
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

// --- 3. HTTP HEADERS ---
const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

// --- 4. INITIALIZATION ---
export default function initializeAxios() {
  axios.defaults.baseURL =
    "https://smile-cart-backend-staging.neetodeployapp.com/";
  setHttpHeaders();
  responseInterceptors();
  requestInterceptors();
}
