"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import ThemeToggle from "./theme-toggle";

type Document = {
  title: string;
  slug: string;
  group: string;
  order: number;
};

type MobileSidebarProps = {
  documents: Document[];
  currentSlug: string;
  currentGroup: string;
  lang: string;
};

export default function MobileSidebar({
  documents,
  currentSlug,
  currentGroup,
  lang,
}: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

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

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleGroup = (group: string) => {
    setOpenGroup(openGroup === group ? null : group);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-sm">
      <button
        onClick={toggleDropdown}
        className="bg-white flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
      >
        <span>Menu</span>
        <ChevronDownIcon
          className={`w-5 h-5 ml-2 -mr-1 text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-800 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          {Object.entries(groupedDocuments).map(([group, docs]) => (
            <div key={group} className="mb-4">
              <button
                onClick={() => toggleGroup(group)}
                className="flex items-center justify-between w-full text-left font-bold mb-2"
              >
                <span>{group}</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openGroup === group ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openGroup === group && (
                <ul className="ml-4">
                  {docs.map((doc) => (
                    <li key={doc.slug} className="mb-2">
                      <Link
                        href={`/${lang}/guide/${doc.group}/${doc.slug}`}
                        className={`flex items-center gap-2 p-2 rounded ${
                          currentSlug === doc.slug && currentGroup === doc.group
                            ? "bg-gray-900 text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <span className="flex-1">{doc.title}</span>
                        <ChevronRightIcon className="w-4 h-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
}
