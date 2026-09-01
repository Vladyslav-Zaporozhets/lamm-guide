"use client";
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import productsData from '@/data/products.json';
import { Search, BookOpen, ChevronRight, Image as ImageIcon, List } from 'lucide-react';

export default function EncyclopediaIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = Array.from(new Set(productsData.map(p => p.category)));
  const [expandedCategory, setExpandedCategory] = useState<string | null>(categories[0]);

  const filteredProducts = productsData.filter(p => {
     if(!searchQuery) return true;
     const q = searchQuery.toLowerCase();
     return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
           <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Wissensdatenbank</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Ihre technische Enzyklopädie für Forsttechnik. Wählen Sie eine Kategorie, um die Artikel zu lesen.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-16 relative">
         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-400" />
         </div>
         <input 
            type="text" 
            placeholder="Suchen Sie nach Seil-Typen, Begriffen oder Produkten..." 
            className="w-full bg-white border-2 border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-slate-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Sidebar Navigation */}
         <div className="lg:col-span-1 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
               <List className="w-4 h-4 mr-2" />
               Kategorien
            </h3>
            {categories.map(category => (
               <button 
                  key={category}
                  onClick={() => setExpandedCategory(category)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors flex justify-between items-center ${expandedCategory === category ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
               >
                  {category}
                  <ChevronRight className={`w-4 h-4 ${expandedCategory === category ? 'text-blue-300' : 'text-slate-400'}`} />
               </button>
            ))}
         </div>

         {/* Main Content Area */}
         <div className="lg:col-span-3">
            {categories.map(category => {
               if (category !== expandedCategory && !searchQuery) return null; // Only show expanded if not searching
               
               const categoryProducts = filteredProducts.filter(p => p.category === category);
               if (categoryProducts.length === 0) return null;

               let catDescription = "";
               if(category.includes('Dyneema')) catDescription = "Leichte, extrem belastbare Kunststoffseile. Schwimmfähig und ergonomisch.";
               if(category.includes('Hochverdichtete')) catDescription = "Glatte Oberfläche, hohe Bruchlast, ideal für professionellen Dauereinsatz.";
               if(category.includes('Traktions')) catDescription = "Spezialseile mit Kunststoffzwischenlage für Harvester und Steilhang-Maschinen.";
               if(category.includes('Standard')) catDescription = "Klassische, robuste Stahlseile für Standardanwendungen.";

               return (
                 <div key={category} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="mb-8 border-b border-slate-100 pb-6">
                       <h2 className="text-3xl font-extrabold text-slate-900">{category}</h2>
                       <p className="text-slate-500 mt-2 text-lg">{catDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {categoryProducts.map(product => (
                          <Link key={product.id} href={`/encyclopedia/${product.id}`} className="group flex bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all overflow-hidden items-stretch">
                             <div className="w-1/3 bg-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 transition-colors">
                                <ImageIcon className="w-8 h-8 opacity-50" />
                             </div>
                             <div className="p-4 w-2/3 flex flex-col justify-center">
                                <h3 className="font-bold text-slate-900 leading-tight mb-1 group-hover:text-blue-700 transition-colors text-sm line-clamp-2">{product.name}</h3>
                                <div className="text-xs font-semibold text-blue-600 mt-2 flex items-center">
                                   Artikel lesen <ChevronRight className="w-3 h-3 ml-1" />
                                </div>
                             </div>
                          </Link>
                       ))}
                    </div>
                 </div>
               );
            })}

            {filteredProducts.length === 0 && (
               <div className="text-center py-20 text-slate-500 text-lg bg-white rounded-3xl border border-slate-200">
                  Keine Artikel gefunden für "{searchQuery}"
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
