"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { BookA, ChevronLeft, Image as ImageIcon, Search } from "lucide-react";

interface GlossaryItem {
  id: string;
  term_de: string;
  term_uk: string;
  description: string;
  image: string | null;
}

export function GlossaryClient({ glossaryData }: { glossaryData: GlossaryItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = glossaryData.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.term_de.toLowerCase().includes(q) ||
      item.term_uk.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Назад до бази
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
                  <BookA className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  Словник термінів
                </h1>
              </div>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
                Офіційний німецько-український глосарій термінів з лісової техніки та такелажу.
              </p>
            </div>

            {/* Smart Search Input */}
            <div className="relative w-full md:w-80 flex-shrink-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Пошук термінів..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm focus:shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        {filteredData.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-600 dark:text-slate-300 mb-2">
              Нічого не знайдено
            </h3>
            <p className="text-slate-500 dark:text-slate-500">
              Спробуйте змінити запит: &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.map((item, index) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row group"
              >
                <div className="w-full md:w-48 h-48 md:h-auto bg-slate-100 dark:bg-slate-800 relative flex-shrink-0 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.term_de}
                      fill
                      priority={index < 4}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 192px"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 group-hover:scale-110 transition-transform" />
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest rounded-md mb-3">
                      DE
                    </span>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                      {item.term_de}
                    </h2>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-2.5 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md mb-2">
                      UK
                    </span>
                    <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
                      {item.term_uk}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
