import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api/currencies": {
          target: "https://hitobit.com/hapi/capital/v1/public/currency/all",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/currencies/, ""),
        },
        "/api/tickers": {
          target: "https://hitobit.com/hapi/exchange/v1/public/alltickers/24hr",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tickers/, ""),
        },
      },
    },
  }
});
