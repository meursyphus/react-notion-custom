#!/usr/bin/env node

import { Command } from "commander";
import { Client } from "@cozy-blog/notion-client";
import * as fs from "fs";
import * as path from "path";

const program = new Command();

program
  .requiredOption("--page <pageUrl>", "Notion page URL")
  .requiredOption("--auth <authToken>", "Notion API authentication token");

program.parse(process.argv);

const options = program.opts();

function extractPageIdFromUrl(url: string): string {
  const urlWithoutQuery = url.split("?")[0];
  const parts = urlWithoutQuery.split("/");

  const lastPart = parts[parts.length - 1]; // e.g., 'Test-105ce18cfd838026a3c7d842636c35a8'

  // Remove any '#' fragment identifiers
  const lastPartWithoutFragment = lastPart.split("#")[0];

  // Match the 32-character hex string at the end
  const idMatch = lastPartWithoutFragment.match(/[0-9a-fA-F]{32}$/);

  if (!idMatch) {
    throw new Error("Invalid Notion page URL. Could not extract page ID.");
  }

  const rawId = idMatch[0]; // '105ce18cfd838026a3c7d842636c35a8'

  // Format ID with dashes: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  const formattedId = [
    rawId.slice(0, 8),
    rawId.slice(8, 12),
    rawId.slice(12, 16),
    rawId.slice(16, 20),
    rawId.slice(20),
  ].join("-");

  return formattedId;
}

const pageId = extractPageIdFromUrl(options.page);

const client = new Client({ auth: options.auth });

(async () => {
  try {
    // Fetch full page data
    const fullPage = await client.fetchFullPage(pageId);

    // Define the output directory and file path
    const outputDir = path.join(process.cwd(), "content", pageId);
    const outputFile = path.join(outputDir, "index.json");

    // Create the directory if it doesn't exist
    fs.mkdirSync(outputDir, { recursive: true });

    // Write the data to index.json (overwrite if it exists)
    fs.writeFileSync(outputFile, JSON.stringify(fullPage, null, 2), "utf-8");

    console.log(`Page data saved to ${outputFile}`);
  } catch (error: any) {
    console.error("Error fetching page data:", error.message);
  }
})();
