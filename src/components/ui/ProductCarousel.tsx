"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductCarousel({ images, productName }: { images?: string[]; productName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Close fullscreen on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    if (isFullscreen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isFullscreen]); // eslint-disable-line react-hooks/exhaustive-deps

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
    <>
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
              className="absolute inset-0 cursor-zoom-in"
              onClick={() => setIsFullscreen(true)}
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

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 hover:scale-110 shadow-sm z-10"
            aria-label="На весь екран"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 hover:scale-110 shadow-lg z-10"
                aria-label="Попереднє фото"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 hover:scale-110 shadow-lg z-10"
                aria-label="Наступне фото"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Pagination Dots (Mobile) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 md:hidden bg-slate-900/40 backdrop-blur px-3 py-1.5 rounded-full z-10">
                {images.map((_, idx) => (
                  <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails (Desktop) */}
        {images.length > 1 && (
          <div className="hidden md:flex items-center gap-3 overflow-x-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-24 h-24 flex-shrink-0 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  idx === currentIndex
                    ? "border-blue-600 dark:border-blue-500 shadow-md scale-105 ring-2 ring-blue-600/20 dark:ring-blue-500/20 ring-offset-1 dark:ring-offset-slate-900"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Мініатюра ${idx + 1}`} fill className="object-contain p-1.5" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
          >
            {/* Top Toolbar */}
            <div className="flex justify-between items-center p-4 text-white">
              <div className="text-sm font-medium opacity-70">{currentIndex + 1} / {images.length}</div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Lightbox Content */}
            <div className="flex-1 relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 p-4 md:p-12"
                  onClick={() => setIsFullscreen(false)} // close when clicking outside image
                >
                  <div className="relative w-full h-full cursor-default" onClick={e => e.stopPropagation()}>
                    <Image
                      src={images[currentIndex]}
                      alt={`${productName} - фото ${currentIndex + 1} (повний екран)`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      quality={100}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Lightbox Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-110 transition-all border border-white/10"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-110 transition-all border border-white/10"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Thumbnails */}
            {images.length > 1 && (
              <div className="p-4 md:p-8 flex items-center justify-center gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentIndex ? "border-blue-500 scale-110 shadow-lg shadow-blue-500/20" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Мініатюра ${idx + 1}`} fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
