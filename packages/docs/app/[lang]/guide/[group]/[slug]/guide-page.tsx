"use client";

import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import {
  DynamicLayout,
  MobileSidebar,
  NavigationButton,
  Sidebar,
  TOC,
} from "@/components";
import { generateTOC } from "@/lib/generateTOC";

interface GuidePageProps {
  params: {
    lang: string;
    group: string;
    slug: string;
  };
  content: string;
  title: string;
  prevDocument: any;
  nextDocument: any;
  allDocuments: any[];
}

export default function GuidePage({
  params,
  content,
  title,
  prevDocument,
  nextDocument,
  allDocuments,
}: GuidePageProps) {
  const { lang, group, slug } = params;
  const tocItems = generateTOC(content);

  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => {
      heading.id =
        heading.textContent?.toLowerCase().replace(/\s+/g, "-") ?? "";
    });
  }, [content]);

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
      <div className="mt-8 mb-4 flex justify-between gap-4">
        <div className="flex-1">
          {prevDocument && (
            <NavigationButton
              document={prevDocument}
              lang={lang}
              direction="prev"
            />
          )}
        </div>
        <div className="flex-1">
          {nextDocument && (
            <NavigationButton
              document={nextDocument}
              lang={lang}
              direction="next"
            />
          )}
        </div>
      </div>
    </DynamicLayout>
  );
}
