import { getAllDocuments, getDocumentBySlug } from "@/lib/mdx";
import { Metadata } from "next";
import GuidePage from "./guide-page";

interface GuidePageProps {
  params: {
    lang: string;
    group: string;
    slug: string;
  };
}

// TODO: Add URL and image
export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { lang, group, slug } = params;
  const { title, content } = await getDocumentBySlug(lang, group, slug);

  return {
    title: `${title} | react-notion-custom Docs`,
    description: content.slice(0, 160),
    openGraph: {
      title: `${title} | react-notion-custom Docs`,
      description: content.slice(0, 160),
      // url: "",
    },
    alternates: {
      // canonical: "",
    },
  };
}

export default async function Page({ params }: GuidePageProps) {
  const { lang, group, slug } = params;

  const { content, title, prevDocument, nextDocument } =
    await getDocumentBySlug(lang, group, slug);
  const allDocuments = getAllDocuments(lang);

  return (
    <GuidePage
      params={params}
      content={content}
      title={title}
      prevDocument={prevDocument}
      nextDocument={nextDocument}
      allDocuments={allDocuments}
    />
  );
}
