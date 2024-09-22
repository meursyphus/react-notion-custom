// pageIdExtractor.test.ts

import { extractPageIdFromUrl } from "../lib/pageIdExtractor";
import { describe, it, expect } from "vitest";

describe("extractPageIdFromUrl", () => {
  it("should correctly extract and format page ID", () => {
    const url = "https://www.notion.so/Test-105ce18cfd838026a3c7d842636c35a8";
    expect(extractPageIdFromUrl(url)).toBe(
      "105ce18c-fd83-8026-a3c7-d842636c35a8",
    );
  });

  it("should throw an error for invalid URL", () => {
    const invalidUrl = "https://www.notion.so/Invalid-Page";
    expect(() => extractPageIdFromUrl(invalidUrl)).toThrow(
      "Invalid Notion page URL. Could not extract page ID.",
    );
  });
});
