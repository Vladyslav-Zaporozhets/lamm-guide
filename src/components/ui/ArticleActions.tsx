"use client";

import { Printer, Share2, Check } from "lucide-react";
import { useState } from "react";

export function ArticleActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Помилка при поширенні:", err);
    }
  };

  return (
    <div className="flex items-center justify-center md:justify-end gap-3 mt-4 md:mt-0">
      <button 
        onClick={() => window.print()} 
        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 backdrop-blur shadow-sm" 
        title="Роздрукувати статтю"
      >
        <Printer className="w-4 h-4" />
      </button>
      <button 
        onClick={handleShare}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 backdrop-blur shadow-sm relative" 
        title="Поділитися"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
        {copied && (
          <span className="absolute -top-8 bg-slate-800 text-xs py-1 px-2 rounded text-white shadow-lg whitespace-nowrap">
            Скопійовано!
          </span>
        )}
      </button>
    </div>
  );
}
