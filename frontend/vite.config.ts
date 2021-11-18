import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import compress from "vite-plugin-compress";
import ViteComponents from "vite-plugin-components";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS(), compress(), ViteComponents()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src")
    }
  },
  server: { fsServe: { root: ".." } }
});
