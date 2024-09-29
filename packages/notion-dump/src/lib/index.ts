#!/usr/bin/env node

import { Command } from "commander";
import { Client } from "@cozy-blog/notion-client";
import { extractPageIdFromUrl } from "./pageIdExtractor";
import * as path from "path";
import { fetchAndSavePageData } from "./dumpPage";
import typia from "typia";

const DEFAULT_OUTPUT_DIR = "notion-data";
const DEFAULT_IMAGE_OUT_DIR = "public/notion-data";

interface CLIOptions {
  page: string;
  auth: string;
  outputDir?: string;
  imageOutDir?: string;
}

const program = new Command();

program
  .requiredOption("--page <pageUrl>", "Notion page URL")
  .requiredOption("--auth <authToken>", "Notion API authentication token")
  .option("--output-dir <dir>", "Output directory", "content")
  .option("--image-out-dir <dir>", "Output directory for images", "public");

program.parse(process.argv);

const options = program.opts();

if (!typia.is<CLIOptions>(options)) {
  console.error("Invalid options", options);
  process.exit(1);
}

const pageId = extractPageIdFromUrl(options.page);

const outputDir = path.join(
  process.cwd(),
  options.outputDir || DEFAULT_OUTPUT_DIR,
);

const imageOutDir = path.join(
  process.cwd(),
  options.imageOutDir || DEFAULT_IMAGE_OUT_DIR,
  pageId,
);

const client = new Client({ auth: options.auth });

/**
 * fetch and save page data
 */
(async () => {
  try {
    await fetchAndSavePageData({ client, pageId, outputDir, imageOutDir });
  } catch (error: any) {
    console.error("Error fetching page data:", error.message);
    process.exit(1);
  }
})();
