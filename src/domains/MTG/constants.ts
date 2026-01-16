const PROD_URL = "https://10.0.0.20:8080";
const DEV_URL = "http://localhost:1213/";
//const DEV_URL = "http://10.0.0.247:1213";
export const BASE_URL =
  process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL;

// this is a custom cors proxy script built on a cloudflare worker.
// dashboard: https://dash.cloudflare.com/f6b468e6ee14bea020b6f4fd38ffa946/workers/services/edit/little-thunder-6c61/production
export const CORS_PROXY_URL = "https://little-thunder-6c61.valault1.workers.dev?url=";
