import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { getAllDocuments, getDocumentBySlug } from "@/lib/mdx";
import {
  DynamicLayout,
  MobileSidebar,
  NavigationButton,
  Sidebar,
  TOC,
} from "@/components";
import { Metadata } from "next";
import { generateTOC } from "@/lib/generateTOC";

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

export default async function GuidePage({ params }: GuidePageProps) {
  const { lang, group, slug } = params;

  const { content, title, prevDocument, nextDocument } =
    await getDocumentBySlug(lang, group, slug);
  const allDocuments = getAllDocuments(lang);
  const tocItems = generateTOC(content);

  return (
    <DynamicLayout
      sidebar={
        <Sidebar
          documents={allDocuments}
          currentSlug={slug}
          currentGroup={group}
          lang={lang}
        />
      }
      mobileSidebar={
        <MobileSidebar
          documents={allDocuments}
          currentSlug={slug}
          currentGroup={group}
          lang={lang}
        />
      }
      toc={<TOC items={tocItems} />}
    >
      <div className="p-4 sm:p-8 md:p-12 bg-white dark:bg-black rounded-sm">
        <p className="text-lg sm:text-xl font-bold mb-4 dark:text-white">
          {group} &gt; {title}
        </p>
        <ReactMarkdown
          className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert prose-headings:dark:text-white prose-p:dark:text-gray-300 prose-strong:dark:text-white prose-code:dark:text-white prose-ul:dark:text-gray-300 prose-ol:dark:text-gray-300"
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
      <div className="mt-8 mb-4 flex justify-between">
        {prevDocument && (
          <NavigationButton
            document={prevDocument}
            lang={lang}
            direction="prev"
          />
        )}

        {nextDocument && (
          <NavigationButton
            document={nextDocument}
            lang={lang}
            direction="next"
          />
        )}
      </div>
    </DynamicLayout>
  );
}
