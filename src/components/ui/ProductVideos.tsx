"use client";

import { PlayCircle } from "lucide-react";

export function ProductVideos({ videos, productName }: { videos?: string[]; productName: string }) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="mt-12 mb-8">
      <h3 className="flex items-center text-xl font-bold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
        <PlayCircle className="w-6 h-6 mr-3 text-red-500" />
        Відеоогляди та інструкції
      </h3>
      
      <div className={`grid gap-6 ${videos.length === 1 ? 'grid-cols-1 max-w-3xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
        {videos.map((vid, idx) => (
          <div 
            key={idx} 
            className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-video hover:shadow-xl transition-all"
          >
            <div className="absolute inset-0 bg-slate-800 animate-pulse -z-10" />
            <iframe 
              className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
              src={`https://www.youtube.com/embed/${vid}?rel=0`}
              title={`YouTube video player - ${productName}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
