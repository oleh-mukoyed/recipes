import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

export default () => {
  //const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    // define: {
    //   "process.env.VITE_TELEGRAM_ID": env.VITE_TELEGRAM_ID,
    //   "process.env.VITE_SERVER_URL": env.VITE_SERVER_URL,
    // },
    plugins: [tsconfigPaths(), react()],
    build: {
      rollupOptions: {
        input: {
          index: resolve("index.html"),
        },
      },
    },
    server: {
      port: 3001,
    },
    preview: {
      port: 5005,
    },
  });
};
