"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductCarousel({ images, productName }: { images?: string[]; productName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] md:aspect-video bg-slate-100 dark:bg-slate-800 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400">
        <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
        <p className="font-semibold tracking-widest uppercase text-sm">Фото відсутнє</p>
      </div>
    );
  }

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="w-full space-y-4">
      {/* Main Image View */}
      <div className="relative w-full aspect-[4/3] md:aspect-video bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`${productName} - фото ${currentIndex + 1}`}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 hover:scale-110 shadow-lg"
              aria-label="Попереднє фото"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 hover:scale-110 shadow-lg"
              aria-label="Наступне фото"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Pagination Dots (Mobile) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 md:hidden bg-slate-900/40 backdrop-blur px-3 py-1.5 rounded-full">
              {images.map((_, idx) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails (Desktop) */}
      {images.length > 1 && (
        <div className="hidden md:flex items-center gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-24 h-24 flex-shrink-0 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? "border-blue-600 dark:border-blue-500 shadow-md scale-105"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`Мініатюра ${idx + 1}`} fill className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
