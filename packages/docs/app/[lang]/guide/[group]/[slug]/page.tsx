import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import Sidebar from "@/components/Sidebar";
import { getAllDocuments, getDocumentBySlug } from "@/lib/mdx";

interface GuidePageProps {
  params: {
    lang: string;
    group: string;
    slug: string;
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { lang, group, slug } = params;

  const { content, title } = await getDocumentBySlug(lang, group, slug);
  const allDocuments = getAllDocuments(lang);

  return (
    <div className="flex">
      <Sidebar
        documents={allDocuments}
        currentSlug={slug}
        currentGroup={group}
        lang={lang}
      />
      <div className="flex-1 p-8 justify-center items-center">
        <p className="text-xl font-bold mb-4">
          {group} &gt; {title}
        </p>
        <ReactMarkdown
          className="prose prose-invert prose-sm sm:prose lg:prose-md xl:prose-lg"
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
