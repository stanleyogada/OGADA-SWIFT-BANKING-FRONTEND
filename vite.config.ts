import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");

const getAliases = () => {
  const paths = ["assets", "components", "constants", "hooks", "pages", "services", "types", "utils"];

  const aliases = paths.reduce((acc, path) => {
    return {
      ...acc,
      [`@${path}`]: `/src/${path}`,
    };
  }, {});

  return aliases;
};

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
});
