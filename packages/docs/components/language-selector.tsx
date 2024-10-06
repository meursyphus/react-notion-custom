"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GlobeAltIcon } from "@heroicons/react/24/solid";

const languages = [
  { code: "en", name: "English" },
  { code: "kr", name: "한국어" },
];

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lang = pathname.split("/")[1];
    if (languages.some((l) => l.code === lang)) {
      setCurrentLang(lang);
    }
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const changeLang = (newLang: string) => {
    const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPathname);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-black text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
        id="language-menu"
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <GlobeAltIcon className="h-5 w-5 mr-2" />
        {languages.find((l) => l.code === currentLang)?.name}
      </button>
      {isMenuOpen && (
        <div className="z-50 origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-black dark:border-white dark:border-2 ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-menu"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLang(lang.code);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
                role="menuitem"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
