import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "NotionDump",
      fileName: (format) => `notion-dump.${format}.js`,
    },
    rollupOptions: {
      external: ["@cozy-blog/notion-client", "commander", "path", "fs"],
      output: {
        globals: {
          "@cozy-blog/notion-client": "NotionClient",
          commander: "commander",
          path: "path",
          fs: "fs",
        },
      },
    },
  },
});
