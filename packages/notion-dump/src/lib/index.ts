#!/usr/bin/env node

import { Command } from "commander";
import { Client } from "@cozy-blog/notion-client";
import { extractPageIdFromUrl } from "./pageIdExtractor";
import * as path from "path";
import { fetchAndSavePageData } from "./dumpPage";

const DEFAULT_OUTPUT_DIR = "content";

interface CLIOptions {
  page: string;
  auth: string;
  outputDir?: string;
}

const program = new Command();

program
  .requiredOption("--page <pageUrl>", "Notion page URL")
  .requiredOption("--auth <authToken>", "Notion API authentication token")
  .option("--output-dir <dir>", "Output directory", "content");

program.parse(process.argv);

const options = program.opts() as CLIOptions;

const pageId = extractPageIdFromUrl(options.page);

const outputDir = path.join(
  process.cwd(),
  options.outputDir || DEFAULT_OUTPUT_DIR,
  pageId,
);

const client = new Client({ auth: options.auth });

(async () => {
  try {
    await fetchAndSavePageData({ client, pageId, outputDir });
  } catch (error: any) {
    console.error("Error fetching page data:", error.message);
    process.exit(1);
  }
})();
