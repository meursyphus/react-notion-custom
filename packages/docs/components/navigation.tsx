"use client";
import Link from "next/link";

import { useParams } from "next/navigation";
import Image from "next/image";
import LanguageSelector from "./language-selector";

export default function Navigation() {
  const params = useParams();
  const lang = (params.lang as string) || "en";

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link
            href={`/${lang}`}
            className="flex-shrink-0 flex gap-2 items-center"
          >
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            <p>react-notion-custom</p>
          </Link>

          <div className="flex gap-5 items-center ml-auto">
            <Link
              href={`/${lang}/guide/getting-started/introduction`}
              className="text-black dark:text-white items-center px-1 pt-1 text-sm font-medium"
            >
              Guide Documentation
            </Link>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}
