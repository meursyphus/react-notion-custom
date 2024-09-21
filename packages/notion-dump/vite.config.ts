import { defineConfig } from "vite";
import { resolve } from "path";

// Library name
const LIB_NAME = "NotionDump";

export default defineConfig({
  build: {
    // Library specific build configuration
    lib: {
      // Set the entry point of the library
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: LIB_NAME,
      fileName: (format) => `${LIB_NAME.toLowerCase()}.${format}.js`,
    },
    rollupOptions: {
      // Specify external dependencies not to be bundled
      external: ["@cozy-blog/notion-client", "commander", "path", "fs"],
      output: {
        // Global variable mapping for UMD build
        globals: {
          "@cozy-blog/notion-client": "NotionClient",
          commander: "commander",
          path: "path",
          fs: "fs",
        },
      },
    },
  },

  // Vite automatically supports TypeScript as long as a tsconfig.json file is present.
  // There's no need to specify additional TypeScript settings within the Vite configuration itself.
  // Vite uses the settings from tsconfig.json during both development and build stages.
  // For more complex scenarios, such as adjusting module resolution, TypeScript settings can be refined in vite.config.ts if needed.

  // plugins: [],
});
