"use client";

import { useEffect, useState } from "react";
import { 
  ChevronRight, 
  Info, 
  Layers, 
  Settings, 
  Briefcase, 
  Box, 
  CheckSquare, 
  Link as LinkIcon, 
  Wrench, 
  ShieldAlert, 
  Factory, 
  ArrowRightLeft, 
  PlusCircle, 
  FileText
} from "lucide-react";

interface TocItem {
  id: string;
  originalText: string;
  cleanText: string;
  level: number;
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-а-яіїєґ]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function getSectionIcon(text: string) {
  const lowerText = text.toLowerCase();
  if (lowerText.includes("загальна")) return <Info className="w-4 h-4 flex-shrink-0" />;
  if (lowerText.includes("варіації") || lowerText.includes("асортимент")) return <Layers className="w-4 h-4 flex-shrink-0" />;
  if (lowerText.includes("технічн")) return <Settings className="w-4 h-4 flex-shrink-0" />;
  if (lowerText.includes("застосування") || lowerText.includes("призначення")) return <Briefcase className="w-4 h-4 flex-shrink-0" />;
  if (lowerText.includes("комплектація") || lowerText.includes("поставк")) return <Box className="w-4 h-4 flex-shrink-0" />;
  if (lowerText.includes("підбору") || lowerText.includes("розрахунк")) return <CheckSquare className="w-4 h-4 flex-shrink-0" />;
  if (lowerText.includes("супутні")) return <LinkIcon className="w-4 h-4 flex-shrink-0" />;
  if (lowerText.includes("інструкція") || lowerText.includes("догляд") || lowerText.includes("монтаж")) return <Wrench className="w-4 h-4 flex-shrink-0" />;
  if (lowerText.includes("безпека") || lowerText.includes("норми") || lowerText.includes("сертифік")) return <ShieldAlert className="w-4 h-4 flex-shrink-0" />;
  if (lowerText.includes("виробник") || lowerText.includes("бренд")) return <Factory className="w-4 h-4 flex-shrink-0" />;
  if (lowerText.includes("альтернатив") || lowerText.includes("конкурент")) return <ArrowRightLeft className="w-4 h-4 flex-shrink-0" />;
  if (lowerText.includes("додаткова")) return <PlusCircle className="w-4 h-4 flex-shrink-0" />;
  return <FileText className="w-4 h-4 flex-shrink-0" />; // fallback icon
}

export function TableOfContents({ markdown }: { markdown: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const headings: TocItem[] = [];
    const regex = /^(##|###)\s+(.+)$/gm;
    let match;

    while ((match = regex.exec(markdown)) !== null) {
      const level = match[1].length; 
      const rawText = match[2].trim().replace(/\\/g, '');
      
      // Remove "РОЗДІЛ X. " or similar prefixes
      const cleanText = rawText.replace(/^РОЗДІЛ\s+\d+\.?\s*/i, "");

      headings.push({
        id: slugify(rawText),
        originalText: rawText,
        cleanText: cleanText,
        level,
      });
    }
    setToc(headings);
  }, [markdown]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the last intersecting entry
        let latestVisible: string | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            latestVisible = entry.target.id;
          }
        });
        
        if (latestVisible) setActiveId(latestVisible);
      },
      { rootMargin: "-100px 0% -60% 0%" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav className="w-full">
      <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs px-2 flex items-center">
        <span className="w-8 h-px bg-slate-200 dark:bg-slate-700 mr-3"></span>
        Зміст статті
      </h4>
      <ul className="space-y-1">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          
          return (
            <li
              key={item.id}
              style={{ marginLeft: `${(item.level - 2) * 1}rem` }}
            >
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 dark:bg-blue-500 scale-[1.02]"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 hover:scale-[1.02]"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (el) {
                    window.scrollTo({
                      top: el.offsetTop - 100, // Account for fixed header
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {/* Icon based on section title */}
                <div className={`flex items-center justify-center transition-colors ${isActive ? "text-white" : "text-slate-400 dark:text-slate-500"}`}>
                  {getSectionIcon(item.originalText)}
                </div>
                
                <span className="leading-snug truncate">
                  {item.cleanText}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
