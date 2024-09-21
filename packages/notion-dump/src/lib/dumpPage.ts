#!/usr/bin/env node

import type { Client } from "@cozy-blog/notion-client";
import * as fs from "fs";
import * as path from "path";

export async function fetchAndSavePageData({
  client,
  pageId,
  outputDir,
}: {
  client: Client;
  pageId: string;
  outputDir: string;
}): Promise<void> {
  // Fetch full page data
  const fullPage = await client.fetchFullPage(pageId);

  // Define the output file path
  const outputFile = path.join(outputDir, "index.json");

  // Create the directory if it doesn't exist
  fs.mkdirSync(outputDir, { recursive: true });

  // Write the data to index.json (overwrite if it exists)
  fs.writeFileSync(outputFile, JSON.stringify(fullPage, null, 2), "utf-8");

  console.log(`Page data saved to ${outputFile}`);
}
