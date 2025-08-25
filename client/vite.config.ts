import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: Number(process.env.FE_PORT),
    proxy: {
      "/api": process.env.API_URL + "",
    },
  },
});
