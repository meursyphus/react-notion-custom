import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { getGroupOrder, GroupId } from "@/constants/group";

const contentDirectory = path.join(process.cwd(), "content", "guide");

interface DocumentData {
  slug: string;
  content: string;
  title: string;
  group: string;
  prevDocument: { slug: string; title: string; group: string } | null;
  nextDocument: { slug: string; title: string; group: string } | null;
}

export async function getDocumentBySlug(
  lang: string,
  group: string,
  slug: string,
): Promise<DocumentData> {
  const notFoundDocument: DocumentData = {
    slug: "",
    content: "<p>Document not found</p>",
    title: "Not Found",
    group: "",
    prevDocument: null,
    nextDocument: null,
  };

  if (!lang || !group || !slug) {
    return notFoundDocument;
  }

  const groupOrder = getGroupOrder(group as GroupId);
  const groupDir = path.join(contentDirectory, lang, `${groupOrder}. ${group}`);

  if (!fs.existsSync(groupDir)) {
    return notFoundDocument;
  }

  const files = fs.readdirSync(groupDir);
  let targetFile = null;

  for (const file of files) {
    const filePath = path.join(groupDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      if (data.slug === slug) {
        targetFile = filePath;
        break;
      }
    }
  }

  if (!targetFile) {
    return notFoundDocument;
  }

  const fileContents = fs.readFileSync(targetFile, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const allDocuments = getAllDocuments(lang);
  const currentIndex = allDocuments.findIndex((doc) => doc.slug === slug);
  const prevDocument = currentIndex > 0 ? allDocuments[currentIndex - 1] : null;
  const nextDocument =
    currentIndex < allDocuments.length - 1
      ? allDocuments[currentIndex + 1]
      : null;

  return {
    slug,
    content: contentHtml,
    title: data.title || "Untitled",
    group: data.group || "",
    prevDocument,
    nextDocument,
  };
}

function getAllDocumentsRecursive(dir: string): any[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);
  let documents: any[] = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      documents = documents.concat(getAllDocumentsRecursive(filePath));
    } else if (file.endsWith(".md")) {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      documents.push({
        ...data,
        slug: data.slug,
        group: data.group,
      });
    }
  });

  return documents;
}

export function getAllDocuments(lang: string) {
  const langDir = path.join(contentDirectory, lang);
  const documents = getAllDocumentsRecursive(langDir);

  return documents;
}
