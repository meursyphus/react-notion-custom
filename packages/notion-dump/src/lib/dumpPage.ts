import { Client } from "@cozy-blog/notion-client";
import * as fs from "fs";
import * as path from "path";
import { updateImageOnBlocks } from "./domloadImage";

export async function fetchAndSavePageData({
  client,
  pageId,
  outputDir,
  imageOutDir,
}: {
  client: Client;
  pageId: string;
  outputDir: string;
  imageOutDir: string;
}): Promise<void> {
  // Fetch full page data
  const fullPage = await client.fetchFullPage(pageId);

  // Create image directory
  fs.mkdirSync(imageOutDir, { recursive: true });

  await updateImageOnBlocks({
    blocks: fullPage.blocks,
    imageDir: imageOutDir,
    pageId, // pageId 전달
  });

  // Define the output file path
  const outputFile = path.join(outputDir, `${pageId}.json`);

  // Create the directory if it doesn't exist
  fs.mkdirSync(outputDir, { recursive: true });

  // Write the updated data to index.json (overwrite if it exists)
  fs.writeFileSync(outputFile, JSON.stringify(fullPage, null, 2), "utf-8");

  console.log(`Page data saved to ${outputFile}`);
  console.log(`Images saved to ${imageOutDir}`);
}
