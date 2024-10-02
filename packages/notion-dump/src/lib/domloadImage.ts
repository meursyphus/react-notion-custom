import * as fs from "fs";
import * as path from "path";
import { getFileExtension } from "./fileExtensionUtils";

async function downloadImage({
  url,
  outputPath,
}: {
  url: string;
  outputPath: string;
}): Promise<string> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  await fs.promises.writeFile(outputPath, Buffer.from(arrayBuffer));

  return response.headers.get("Content-Type") || "";
}

async function updateImageOnBlock(
  {
    block,
    imageDir,
    pageId,
  }: {
    block: any;
    imageDir: string;
    pageId: string;
  },
  imageCounter: { count: number },
): Promise<void> {
  if (block.type === "image") {
    const imageType = block.image.type;
    const originalUrl = block.image[imageType].url;
    const imageName = `image_${imageCounter.count}`;
    const tempPath = path.join(imageDir, `${imageName}_temp`);

    try {
      imageCounter.count++;

      const contentType = await downloadImage({
        url: originalUrl,
        outputPath: tempPath,
      });

      const extension = getFileExtension(contentType, originalUrl);

      const finalPath = path.join(imageDir, `${imageName}${extension}`);
      await fs.promises.rename(tempPath, finalPath);

      const newUrl = `/notion-data/${pageId}/${imageName}${extension}`;
      block.image[imageType].url = newUrl;

      console.log(`Image saved: ${finalPath}`);
    } catch (error) {
      console.error(`Failed to process image: ${originalUrl}`, error);
    }
  }

  if (block.blocks) {
    await updateImageOnBlocks({
      blocks: block.blocks,
      imageDir,
      pageId,
      imageCounter,
    });
  }
}

export async function updateImageOnBlocks({
  blocks,
  imageDir,
  pageId,
  imageCounter = { count: 1 },
}: {
  blocks: any[];
  imageDir: string;
  pageId: string;
  imageCounter?: { count: number };
}): Promise<void> {
  const updatePromises = blocks.map((block) =>
    updateImageOnBlock({ block, imageDir, pageId }, imageCounter),
  );

  await Promise.all(updatePromises);
}
