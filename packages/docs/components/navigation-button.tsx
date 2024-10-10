import Link from "next/link";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

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
      className="block w-full border cursor-pointer border-black p-1 sm:p-2 rounded-sm hover:bg-black hover:text-white dark:border-gray-500 dark:hover:bg-black dark:hover:text-white text-sm sm:text-base"
      href={`/${lang}/guide/${document.group}/${document.slug}`}
    >
      {direction === "prev" ? (
        <div className="flex items-center gap-5 h-16">
          <ChevronLeftIcon className="h-4 w-4 inline-block" />
          <p className="max-w-[100px] sm:max-w-full">{document.title}</p>
        </div>
      ) : (
        <div className="flex items-center gap-5 justify-end h-16">
          <p className="max-w-[100px] sm:max-w-full">{document.title}</p>
          <ChevronRightIcon className="h-4 w-4 inline-block" />
        </div>
      )}
    </Link>
  );
}
