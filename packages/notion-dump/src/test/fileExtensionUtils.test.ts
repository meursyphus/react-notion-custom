import { describe, it, expect } from "vitest";
import {
  getFileExtensionFromContentType,
  getFileExtensionFromUrl,
  getFileExtension,
  DEFAULT_IMAGE_EXTENSION,
} from "../lib/fileExtensionUtils";

describe("File Extension Utilities", () => {
  describe("getFileExtensionFromContentType", () => {
    it.each([
      ["image/jpeg", ".jpg"],
      ["image/png", ".png"],
      ["image/gif", ".gif"],
      ["image/webp", ".webp"],
      ["image/svg+xml", ".svg"],
    ])("should return %s for MIME type %s", (mimeType, expectedExtension) => {
      expect(getFileExtensionFromContentType(mimeType)).toBe(expectedExtension);
    });

    it.each([["image/tiff"], ["application/pdf"]])(
      "should return undefined for unsupported MIME type %s",
      (mimeType) => {
        expect(getFileExtensionFromContentType(mimeType)).toBeUndefined();
      },
    );
  });

  describe("getFileExtensionFromUrl", () => {
    it.each([
      ["https://example.com/image.jpg", ".jpg"],
      ["https://example.com/path/to/image.png?param=value", ".png"],
      ["https://example.com/image", ""],
      ["https://example.com/path/to/image?param=value", ""],
    ])(
      'should extract correct extension "%s" from URL %s',
      (url, expectedExtension) => {
        expect(getFileExtensionFromUrl(url)).toBe(expectedExtension);
      },
    );
  });

  describe("getFileExtension", () => {
    it.each([
      ["image/png", "https://example.com/image.jpg", ".png"],
      ["image/tiff", "https://example.com/image.gif", ".gif"],
      ["image/tiff", "https://example.com/image", DEFAULT_IMAGE_EXTENSION],
      ["image/png", "https://example.com/image.jpg", ".png"],
      ["image/tiff", "https://example.com/image.bmp", DEFAULT_IMAGE_EXTENSION],
    ])(
      "should return %s for content type %s and URL %s",
      (contentType, url, expectedExtension) => {
        expect(getFileExtension(contentType, url)).toBe(expectedExtension);
      },
    );
  });
});
