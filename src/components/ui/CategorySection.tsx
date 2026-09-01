"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CategorySection({ categoryKey, products }: { categoryKey: string, products: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const tCat = useTranslations('Categories');
  const tUI = useTranslations('ProductCard');
  
  // Try to get translation, fallback to key if missing
  const localizedCategoryName = tCat.has(categoryKey) ? tCat(categoryKey) : categoryKey;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
          <span className="bg-orange-500 w-2 h-6 rounded-full mr-3"></span>
          {localizedCategoryName} <span className="ml-3 text-sm font-normal text-slate-500">({products.length} {tUI('productsCount')})</span>
        </h2>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      
      {isOpen && (
        <div className="p-6 border-t border-slate-200 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
