import { Block } from "@cozy-blog/notion-client";
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type ImageBlockObjectResponseExtended = ImageBlockObjectResponse & {
  blocks: Block[];
};

export function isImageBlock(
  block: Block,
): block is ImageBlockObjectResponseExtended {
  return block.type === "image";
}

function isExternalImage(
  image: ImageBlockObjectResponseExtended["image"],
): image is Extract<
  ImageBlockObjectResponseExtended["image"],
  { type: "external" }
> {
  return image.type === "external";
}

function isFileImage(
  image: ImageBlockObjectResponseExtended["image"],
): image is Extract<
  ImageBlockObjectResponseExtended["image"],
  { type: "file" }
> {
  return image.type === "file";
}

export function getImageUrl(block: ImageBlockObjectResponseExtended): string {
  if (isExternalImage(block.image)) {
    return block.image.external.url;
  } else if (isFileImage(block.image)) {
    return block.image.file.url;
  }
  throw new Error("Invalid image type");
}

export function updateImageUrl(
  block: ImageBlockObjectResponseExtended,
  newUrl: string,
): void {
  if (isExternalImage(block.image)) {
    block.image.external.url = newUrl;
  } else if (isFileImage(block.image)) {
    block.image.file.url = newUrl;
  } else {
    throw new Error("Invalid image type");
  }
}
