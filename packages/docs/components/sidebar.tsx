import Link from "next/link";
import ThemeToggle from "./theme-toggle";

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
    <nav className="w-60 h-fit m-5 p-4 rounded-md border-2 border-black flex flex-col gap-2">
      <div>
        {Object.entries(groupedDocuments).map(([group, docs]) => (
          <div key={group}>
            <h3 className="font-bold mb-2 text-lg">{group}</h3>
            <ul>
              {docs.map((doc) => (
                <li key={doc.slug} className="mb-1">
                  <Link
                    href={`/${lang}/guide/${doc.group}/${doc.slug}`}
                    className={`block cursor-pointer p-2 rounded ${
                      currentSlug === doc.slug && currentGroup === doc.group
                        ? "bg-gray-700 text-white"
                        : "hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {doc.title}
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
