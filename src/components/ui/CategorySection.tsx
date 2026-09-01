"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronDown, ChevronUp } from "lucide-react";

// Helper to map DB string to translation string safely
const categoryMap: Record<string, string> = {
  "Hochverdichtete Forstwindenseile": "Hochverdichtete",
  "Standard Forstwindenseile": "Standard",
  "Dyneema Forstwindenseile": "Dyneema",
  "Traktionswindenseile": "Traktionswindenseile",
  "Forstwindenseile": "Forstwindenseile"
};

export default function CategorySection({ categoryKey, products, tCat, tUI }: any) {
  const [isOpen, setIsOpen] = useState(false); // CLOSED by default as requested
  
  // Safe translation
  const mappedKey = categoryMap[categoryKey] || categoryKey;
  const localizedCategoryName = tCat.has(mappedKey) ? tCat(mappedKey) : categoryKey;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
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
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} tCat={tCat} tUI={tUI} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
