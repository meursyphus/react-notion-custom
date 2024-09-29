import { Client } from "@cozy-blog/notion-client";
import * as fs from "fs";
import * as path from "path";
import { updateImageUrls } from "./domloadImage";

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

  // Process and update image URLs
  const updatePromises = fullPage.blocks.map((block) =>
    updateImageUrls({ block, imageDir: imageOutDir }),
  );

  // Wait for all update promises to resolve
  await Promise.all(updatePromises);

  // Define the output file path
  const outputFile = path.join(outputDir, "index.json");

  // Create the directory if it doesn't exist
  fs.mkdirSync(outputDir, { recursive: true });

  // Write the updated data to index.json (overwrite if it exists)
  fs.writeFileSync(outputFile, JSON.stringify(fullPage, null, 2), "utf-8");

  console.log(`Page data saved to ${outputFile}`);
  console.log(`Images saved to ${imageOutDir}`);
}
