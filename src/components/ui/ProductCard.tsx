"use client";
import { useState } from "react";
import { Ruler, Activity, CheckCircle, Tag, Wrench, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Link } from "@/i18n/routing";

const categoryMap: Record<string, string> = {
  "Hochverdichtete Forstwindenseile": "Hochverdichtete",
  "Standard Forstwindenseile": "Standard",
  "Dyneema Forstwindenseile": "Dyneema",
  "Traktionswindenseile": "Traktionswindenseile",
  "Forstwindenseile": "Forstwindenseile"
};

export default function ProductCard({ product, tCat, tUI }: any) {
  const uniqueDiameters = Array.from(new Set(product.variants.map((v: any) => v.diameter_mm))).sort((a: any, b: any) => a - b);
  const hasLengths = product.variants.some((v: any) => v.length_m !== null);
  
  const [selectedDiameter, setSelectedDiameter] = useState<number>(uniqueDiameters[0] as number);
  
  const availableVariants = product.variants.filter((v: any) => v.diameter_mm === selectedDiameter);
  const uniqueLengths = Array.from(new Set(availableVariants.map((v: any) => v.length_m))).filter(Boolean).sort((a: any, b: any) => (a as number) - (b as number)) as number[];
  
  const [selectedLength, setSelectedLength] = useState<number | null>(hasLengths && uniqueLengths.length > 0 ? uniqueLengths[0] : null);

  const activeVariant = product.variants.find(
    (v: any) => v.diameter_mm === selectedDiameter && (hasLengths && selectedLength ? v.length_m === selectedLength : true)
  ) || availableVariants[0];

  const handleDiameterChange = (dia: number) => {
    setSelectedDiameter(dia);
    const newAvailable = product.variants.filter((v: any) => v.diameter_mm === dia);
    const newLengths = Array.from(new Set(newAvailable.map((v: any) => v.length_m))).filter(Boolean) as number[];
    if (hasLengths && selectedLength && !newLengths.includes(selectedLength)) {
      setSelectedLength(newLengths[0] || null);
    }
  };
  
  const mappedKey = categoryMap[product.category] || product.category;
  const localizedCategoryName = tCat.has(mappedKey) ? tCat(mappedKey) : product.category;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full relative group">
      <div className="h-40 bg-slate-100 border-b border-slate-200 flex flex-col items-center justify-center text-slate-400 group-hover:bg-slate-200 transition-colors">
         <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
         <span className="text-xs uppercase tracking-widest opacity-60">{tUI('noImage')}</span>
      </div>

      <div className="p-5 bg-white flex-none">
        <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1 block">
          {localizedCategoryName}
        </span>
        <h3 className="text-lg font-bold text-slate-900 leading-tight line-clamp-2" title={product.name}>{product.name}</h3>
      </div>
      
      <div className="px-5 pb-5 space-y-5 flex-grow flex flex-col">
        
        <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-100 flex-none">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">{tUI('diameter')}</label>
              {uniqueDiameters.length > 1 ? (
                  <select 
                    className="w-full bg-white border border-slate-300 rounded py-1.5 px-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                    value={selectedDiameter}
                    onChange={(e) => handleDiameterChange(Number(e.target.value))}
                  >
                    {uniqueDiameters.map((dia: any) => (
                      <option key={dia} value={dia}>Ø {dia} mm</option>
                    ))}
                  </select>
              ) : (
                  <div className="w-full bg-slate-200/50 border border-transparent rounded py-1.5 px-2 text-sm text-slate-600 font-medium">
                     Ø {uniqueDiameters[0]} mm
                  </div>
              )}
            </div>
            
            {hasLengths && uniqueLengths.length > 0 && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">{tUI('length')}</label>
                {uniqueLengths.length > 1 ? (
                    <select 
                      className="w-full bg-white border border-slate-300 rounded py-1.5 px-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                      value={selectedLength || ""}
                      onChange={(e) => setSelectedLength(Number(e.target.value))}
                    >
                      {uniqueLengths.map(len => (
                        <option key={len} value={len}>{len} m</option>
                      ))}
                    </select>
                ) : (
                    <div className="w-full bg-slate-200/50 border border-transparent rounded py-1.5 px-2 text-sm text-slate-600 font-medium">
                       {uniqueLengths[0]} m
                    </div>
                )}
              </div>
            )}
          </div>
        </div>

        {activeVariant && (
          <div className="grid grid-cols-2 gap-y-2 text-sm border-t border-slate-100 pt-3 flex-none">
            <div className="text-slate-500 text-xs">{tUI('sku')}:</div>
            <div className="font-mono text-xs text-right text-slate-900">{activeVariant.sku}</div>
            <div className="text-slate-500 text-xs">{tUI('price')}:</div>
            <div className="font-bold text-right text-orange-600">€{activeVariant.price.toFixed(2)}</div>
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-slate-100">
           <Link 
             href={/products/ + product.id} 
             className="w-full flex items-center justify-center bg-slate-900 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
           >
             {tUI('fullConfig')}
             <ArrowRight className="w-4 h-4 ml-2" />
           </Link>
        </div>
      </div>
    </div>
  );
}
