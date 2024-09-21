// pageIdExtractor.ts

export function extractPageIdFromUrl(url: string): string {
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
