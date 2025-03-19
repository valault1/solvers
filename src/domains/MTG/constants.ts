const PROD_URL = "https://10.0.0.20:8080/";
const DEV_URL = "http://localhost:1213/";

export const BASE_URL =
  process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL;
