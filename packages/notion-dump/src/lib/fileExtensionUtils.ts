import * as path from "path";

export type SupportedImageMimeType =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "image/svg+xml";

export type SupportedImageExtension =
  | ".jpg"
  | ".png"
  | ".gif"
  | ".webp"
  | ".svg";

export const DEFAULT_IMAGE_EXTENSION: SupportedImageExtension = ".jpg";

const mimeTypeToExtensionMap: Record<
  SupportedImageMimeType,
  SupportedImageExtension
> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
};

export function getFileExtensionFromContentType(
  contentType: string,
): SupportedImageExtension | undefined {
  return mimeTypeToExtensionMap[contentType as SupportedImageMimeType];
}

export function getFileExtensionFromUrl(url: string): string {
  const urlSegments = url.split("/");
  const filenameWithQuery = urlSegments[urlSegments.length - 1];
  const filename = filenameWithQuery.split("?")[0];
  return path.extname(filename);
}

export function getFileExtension(
  contentType: string,
  originalUrl: string,
): SupportedImageExtension {
  const extensionFromContentType = getFileExtensionFromContentType(contentType);
  if (extensionFromContentType) return extensionFromContentType;

  const extensionFromUrl = getFileExtensionFromUrl(originalUrl);
  if (
    extensionFromUrl &&
    Object.values(mimeTypeToExtensionMap).includes(
      extensionFromUrl as SupportedImageExtension,
    )
  ) {
    return extensionFromUrl as SupportedImageExtension;
  }

  return DEFAULT_IMAGE_EXTENSION;
}
