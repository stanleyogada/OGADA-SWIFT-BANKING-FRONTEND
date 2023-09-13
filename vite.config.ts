import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");

const getAliases = () => {
  const paths = ["assets", "components", "constants", "hooks", "pages", "services", "types", "utils", "contexts", "DS"];

  const aliases = paths.reduce((acc, path) => {
    return {
      ...acc,
      [`@${path}`]: `/src/${path}`,
    };
  }, {});

  return aliases;
};

const getDevPort = (() =>
  process.env.NODE_ENV === "production"
    ? {
        server: {
          port: 80,
        },
      }
    : {})();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      ...getAliases(),
    },
  },
  optimizeDeps: {
    exclude: ["react-rc"],
  },

  ...getDevPort,
});
