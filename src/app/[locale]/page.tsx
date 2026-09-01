"use client";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import productsData from '@/data/products.json';
import CategorySection from '@/components/ui/CategorySection';
import { useState } from 'react';
import { Search } from 'lucide-react';
 
export default function HomePage() {
  const t = useTranslations('Index');
  const tCat = useTranslations('Categories');
  const tUI = useTranslations('ProductCard');
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = Array.from(new Set(productsData.map(p => p.category)));

  // Filter products by search
  const filteredProducts = productsData.filter(p => {
     if(!searchQuery) return true;
     const q = searchQuery.toLowerCase();
     return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.variants.some(v => v.sku.toLowerCase().includes(q));
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{t('title')}</h1>
          <p className="text-slate-500 mt-2 text-lg">{t('description')}</p>
        </div>
        <div className="flex gap-2 bg-white rounded-lg p-1 border shadow-sm">
          <Link href="/" locale="de" className="px-4 py-2 text-sm font-semibold rounded hover:bg-slate-100 transition-colors text-slate-700">Deutsch</Link>
          <Link href="/" locale="uk" className="px-4 py-2 text-sm font-semibold rounded hover:bg-slate-100 transition-colors text-slate-700">Українська</Link>
        </div>
      </div>
      
      {/* Smart Search Bar */}
      <div className="mb-10 relative">
         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
         </div>
         <input 
            type="text" 
            placeholder="Suche nach Artikel, SKU, Durchmesser..." 
            className="w-full bg-white border border-slate-300 rounded-xl py-4 pl-12 pr-4 text-slate-900 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
         />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{tCat('SEILE')}</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 mb-8 pb-4 border-b border-slate-100">{tCat('Forstwindenseile')}</h3>
          
          <div className="space-y-6">
            {categories.map((category) => {
              const categoryProducts = filteredProducts.filter(p => p.category === category);
              if(categoryProducts.length === 0) return null; // Hide if search doesn't match anything here
              return <CategorySection key={category} categoryKey={category} products={categoryProducts} tCat={tCat} tUI={tUI} />;
            })}
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                 Keine Produkte gefunden für "{searchQuery}"
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
