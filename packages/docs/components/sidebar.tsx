import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

type Document = {
  title: string;
  slug: string;
  group: string;
  order: number;
};

type SidebarProps = {
  documents: Document[];
  currentSlug: string;
  currentGroup: string;
  lang: string;
};

export default function Sidebar({
  documents,
  currentSlug,
  currentGroup,
  lang,
}: SidebarProps) {
  const groupedDocuments = documents.reduce(
    (acc, doc) => {
      if (!acc[doc.group]) {
        acc[doc.group] = [];
      }
      acc[doc.group].push(doc);
      return acc;
    },
    {} as Record<string, Document[]>,
  );

  return (
    <nav className="w-64 h-fit p-4 rounded-md border-2 dark:border-white border-black flex flex-col gap-2">
      <div>
        {Object.entries(groupedDocuments).map(([group, docs]) => (
          <div key={group}>
            <h3 className="font-black mb-1 text-xl dark:text-gray-500">
              {group}
            </h3>
            <ul className="ml-0.5">
              {docs.map((doc) => (
                <li key={doc.slug} className="mb-1">
                  <Link
                    href={`/${lang}/guide/${doc.group}/${doc.slug}`}
                    className={`flex justify-center items-center gap-1 cursor-pointer p-2 rounded ${
                      currentSlug === doc.slug && currentGroup === doc.group
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-900 hover:text-white dark:hover:bg-gray-900 dark:hover:text-white dark:text-gray-500"
                    }`}
                  >
                    <p className="flex-1">{doc.title}</p>
                    <ChevronRightIcon className="h-4 w-4 inline-block" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ThemeToggle />
    </nav>
  );
}
