"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ChevronRight, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import productsData from "@/data/products.json";
import { createPortal } from "react-dom";
import Image from "next/image";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
    }
  }, [isOpen]);

  const filtered = query
    ? productsData.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Знайти товар, категорію чи статтю..."
                className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-lg"
              />
              <button onClick={() => setIsOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {query && filtered.length === 0 ? (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                  Нічого не знайдено за запитом &quot;{query}&quot;
                </div>
              ) : (
                <div className="py-2">
                  {filtered.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        router.push(`/uk/article/${product.id}`);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex-shrink-0 mr-4 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                        {product.images && product.images.length > 0 ? (
                          <Image src={product.images[0]} alt={product.name} fill sizes="48px" className="object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{product.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{product.category}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 ml-3 flex-shrink-0" />
                    </button>
                  ))}
                  {!query && (
                    <div className="px-4 py-8 text-center text-sm text-slate-400">
                      Введіть назву для пошуку...
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span>Пошук...</span>
        <kbd className="ml-2 font-mono text-[10px] bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-bold">Ctrl K</kbd>
      </button>

      {mounted ? createPortal(modal, document.body) : null}
    </>
  );
}
