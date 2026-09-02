"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Basic github-slugger equivalent function for client-side slug generation
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-а-яіїєґ]+/g, '') // Remove all non-word chars except cyrillic
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function TableOfContents({ markdown }: { markdown: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    // Extract headers (## and ###)
    const headings: TocItem[] = [];
    const regex = /^(##|###)\s+(.+)$/gm;
    let match;

    while ((match = regex.exec(markdown)) !== null) {
      const level = match[1].length; // 2 or 3
      const text = match[2].trim();
      // rehype-slug uses github-slugger, which handles cyrillic well if we use our slugify
      headings.push({
        id: slugify(text),
        text: text.replace(/\\/g, ''), // clean up markdown escapes if any
        level,
      });
    }
    setToc(headings);
  }, [markdown]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
      <h4 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs">
        Зміст
      </h4>
      <ul className="space-y-2.5 text-sm">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className={`flex items-start transition-colors duration-200 ${
                activeId === item.id
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  window.scrollTo({
                    top: el.offsetTop - 80, // Account for fixed header
                    behavior: "smooth",
                  });
                }
              }}
            >
              {activeId === item.id && (
                <ChevronRight className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
              )}
              <span className={activeId === item.id ? "ml-0" : "ml-5"}>
                {item.text}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
