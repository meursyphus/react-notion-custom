import Link from "next/link";

interface NavigationButtonProps {
  document: {
    group: string;
    slug: string;
    title: string;
  };
  lang: string;
  direction: "prev" | "next";
}

export default function NavigationButton({
  document,
  lang,
  direction,
}: NavigationButtonProps) {
  return (
    <Link
      className="border cursor-pointer border-black p-1 sm:p-2 rounded-sm hover:bg-black hover:text-white dark:border-gray-500 dark:hover:bg-black dark:hover:text-white text-sm sm:text-base"
      href={`/${lang}/guide/${document.group}/${document.slug}`}
    >
      {direction === "prev" ? (
        <p className="max-w-[100px] sm:max-w-full">← {document.title}</p>
      ) : (
        <p className="max-w-[100px] sm:max-w-full">{document.title} →</p>
      )}
    </Link>
  );
}
