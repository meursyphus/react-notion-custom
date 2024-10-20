export interface TOCItem {
  id: string;
  title: string;
}

export function generateTOC(content: string): TOCItem[] {
  const lines = content.split("\n");
  const toc: TOCItem[] = [];

  lines.forEach((line) => {
    if (line.startsWith("<h2>")) {
      const title = line.slice(4, -5).trim();
      const id = title.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-");
      toc.push({ id, title });
    }
  });

  return toc;
}
