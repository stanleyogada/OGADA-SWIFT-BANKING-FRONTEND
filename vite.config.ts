import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     "~": path.resolve(__dirname, "src"),
  //   },
  // },
  resolve: {
    alias: {
      "@/components": "/components",
      "@/icons": "/icons",
      "@/pages": "/pages",
    },
  },
});
