import * as fs from "fs";
import * as path from "path";

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

  // Return the Content-Type header
  return response.headers.get("Content-Type") || "";
}

import * as path from "path";

type SupportedImageMimeType = 
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "image/svg+xml";

type SupportedImageExtension = ".jpg" | ".png" | ".gif" | ".webp" | ".svg";

const DEFAULT_IMAGE_EXTENSION: SupportedImageExtension = ".jpg";

const mimeTypeToExtensionMap: Record<SupportedImageMimeType, SupportedImageExtension> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
};

function getFileExtensionFromContentType(contentType: string): SupportedImageExtension | undefined {
  return mimeTypeToExtensionMap[contentType as SupportedImageMimeType];
}

function getFileExtensionFromUrl(url: string): string {
  const urlSegments = url.split("/");
  const filenameWithQuery = urlSegments[urlSegments.length - 1];
  const filename = filenameWithQuery.split("?")[0];
  return path.extname(filename);
}

function getFileExtension(contentType: string, originalUrl: string): SupportedImageExtension {
  // First, try to determine extension from Content-Type
  const extensionFromContentType = getFileExtensionFromContentType(contentType);
  if (extensionFromContentType) return extensionFromContentType;

  // If Content-Type doesn't help, try to extract from the URL
  const extensionFromUrl = getFileExtensionFromUrl(originalUrl);
  if (extensionFromUrl && Object.values(mimeTypeToExtensionMap).includes(extensionFromUrl as SupportedImageExtension)) {
    return extensionFromUrl as SupportedImageExtension;
  }

  // Default to .jpg if we can't determine the extension
  return DEFAULT_IMAGE_EXTENSION;
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
    const imageName = `image_${imageCounter.count}`; // Temporarily without extension
    const tempPath = path.join(imageDir, `${imageName}_temp`);

    try {
      // Increment the counter
      imageCounter.count++;

      // Download image and get Content-Type
      const contentType = await downloadImage({
        url: originalUrl,
        outputPath: tempPath,
      });

      // Determine file extension
      const extension = getFileExtension(contentType, originalUrl);

      // Rename the file with the correct extension
      const finalPath = path.join(imageDir, `${imageName}${extension}`);
      await fs.promises.rename(tempPath, finalPath);

      // 이미지 URL 업데이트
      const newUrl = `/notion-data/${pageId}/${imageName}${extension}`;
      block.image[imageType].url = newUrl;

      console.log(`Image saved: ${finalPath}`);
    } catch (error) {
      console.error(`Failed to process image: ${originalUrl}`, error);
    }
  }

  // Recursively process child blocks
  if (block.blocks) {
    await updateImageOnBlocks({
      blocks: block.blocks,
      imageDir,
      pageId, // 전달
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
