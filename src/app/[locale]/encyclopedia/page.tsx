"use client";
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import productsData from '@/data/products.json';
import { Search, BookOpen, ChevronRight, Image as ImageIcon, LayoutGrid, Shield, Zap, Mountain, Anchor } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function EncyclopediaIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const t = useTranslations('Encyclopedia');
  const categories = Array.from(new Set(productsData.map(p => p.category)));
  const [expandedCategory, setExpandedCategory] = useState<string | null>(categories[0]);

  const filteredProducts = productsData.filter(p => {
     if(!searchQuery) return true;
     const q = searchQuery.toLowerCase();
     return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
  });

  // Helper for dynamic icons based on category
  const getCategoryIcon = (cat: string) => {
    if(cat.includes('Dyneema')) return <Zap className="w-6 h-6 text-blue-500" />;
    if(cat.includes('Hochverdichtete')) return <Shield className="w-6 h-6 text-emerald-500" />;
    if(cat.includes('Traktions')) return <Mountain className="w-6 h-6 text-orange-500" />;
    return <Anchor className="w-6 h-6 text-slate-500" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Modern Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden border-b border-slate-800">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-24 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl ring-1 ring-white/20 mb-6 backdrop-blur-md">
             <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-medium">
            {t('description')}
          </p>

          {/* Big Search Bar */}
          <div className="max-w-3xl mx-auto relative group">
             <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
             </div>
             <input 
                type="text" 
                placeholder={t('searchPlaceholder')} 
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-5 pl-14 pr-6 text-white placeholder-slate-400 shadow-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 outline-none text-lg transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
         
         {/* Category Bento Grid */}
         {!searchQuery && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
               {categories.map(category => (
                  <button 
                     key={category}
                     onClick={() => setExpandedCategory(category)}
                     className={`flex flex-col items-start p-6 rounded-2xl border transition-all text-left group ${expandedCategory === category ? 'bg-white border-blue-500 shadow-lg ring-1 ring-blue-500' : 'bg-white/80 border-slate-200 hover:border-blue-300 hover:shadow-md hover:bg-white backdrop-blur-sm'}`}
                  >
                     <div className={`p-3 rounded-xl mb-4 transition-colors ${expandedCategory === category ? 'bg-blue-50' : 'bg-slate-100 group-hover:bg-blue-50'}`}>
                        {getCategoryIcon(category)}
                     </div>
                     <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1 line-clamp-1">{category}</h3>
                     <span className="text-xs font-semibold text-slate-500">{productsData.filter(p => p.category === category).length} {t('readArticle').split(' ')[0]}</span>
                  </button>
               ))}
            </div>
         )}

         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation (Only visible if searching to jump to results, otherwise grid acts as nav) */}
            {searchQuery && (
               <div className="lg:col-span-1 space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                     <LayoutGrid className="w-4 h-4 mr-2" />
                     {t('categoriesTitle')}
                  </h3>
                  {categories.map(category => {
                     const matchCount = filteredProducts.filter(p => p.category === category).length;
                     if(matchCount === 0) return null;
                     return (
                        <button 
                           key={category}
                           onClick={() => setExpandedCategory(category)}
                           className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors flex justify-between items-center ${expandedCategory === category ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                        >
                           <span className="truncate pr-2">{category}</span>
                           <span className={`text-xs px-2 py-0.5 rounded-full ${expandedCategory === category ? 'bg-blue-500/50' : 'bg-slate-200'}`}>{matchCount}</span>
                        </button>
                     )
                  })}
               </div>
            )}

            {/* Main Content Area */}
            <div className={searchQuery ? "lg:col-span-3" : "lg:col-span-4"}>
               {categories.map(category => {
                  if (!searchQuery && category !== expandedCategory) return null;
                  
                  const categoryProducts = filteredProducts.filter(p => p.category === category);
                  if (categoryProducts.length === 0) return null;

                  let catDescription = "";
                  if(category.includes('Dyneema')) catDescription = t('catDyneema');
                  if(category.includes('Hochverdichtete')) catDescription = t('catHoch');
                  if(category.includes('Traktions')) catDescription = t('catTraktion');
                  if(category.includes('Standard')) catDescription = t('catStandard');
                  if(category.includes('Seilklemmen')) catDescription = t('catSeilklemmen');

                  return (
                    <div key={category} className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="mb-8 border-b border-slate-100 pb-6 flex items-start justify-between">
                          <div>
                             <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{category}</h2>
                             <p className="text-slate-500 mt-2 text-lg">{catDescription}</p>
                          </div>
                          <div className="hidden md:flex p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             {getCategoryIcon(category)}
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                          {categoryProducts.map(product => (
                             <Link key={product.id} href={`/encyclopedia/${product.id}`} className="group flex flex-col bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all overflow-hidden h-full">
                                <div className="h-40 bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 transition-colors relative overflow-hidden">
                                   <ImageIcon className="w-10 h-10 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 group-hover:text-blue-500" />
                                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col justify-between bg-white">
                                   <div>
                                      <h3 className="font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-700 transition-colors text-base line-clamp-2">{product.name}</h3>
                                   </div>
                                   <div className="inline-flex items-center text-sm font-bold text-blue-600 mt-4 group-hover:translate-x-1 transition-transform">
                                      {t('readArticle')} <ChevronRight className="w-4 h-4 ml-1" />
                                   </div>
                                </div>
                             </Link>
                          ))}
                       </div>
                    </div>
                  );
               })}

               {filteredProducts.length === 0 && (
                  <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm">
                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
                        <Search className="w-8 h-8" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-700 mb-2">{t('noProducts')}</h3>
                     <p className="text-slate-500">Versuchen Sie es mit anderen Suchbegriffen.</p>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
