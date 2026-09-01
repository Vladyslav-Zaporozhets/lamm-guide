"use client";
import { useState } from "react";
import { Ruler, Activity, CheckCircle, Tag, Wrench, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type Variant = {
  sku: string;
  diameter_mm: number;
  length_m: number | null;
  bruchkraft_kn: number;
  price: number;
};

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  variants: Variant[];
  compatibility: string[];
};

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations('ProductCard');
  const tCat = useTranslations('Categories');

  const uniqueDiameters = Array.from(new Set(product.variants.map((v) => v.diameter_mm))).sort((a, b) => a - b);
  const hasLengths = product.variants.some((v) => v.length_m !== null);
  
  const [selectedDiameter, setSelectedDiameter] = useState<number>(uniqueDiameters[0]);
  
  const availableVariants = product.variants.filter((v) => v.diameter_mm === selectedDiameter);
  const uniqueLengths = Array.from(new Set(availableVariants.map((v) => v.length_m))).filter(Boolean).sort((a, b) => (a as number) - (b as number)) as number[];
  
  const [selectedLength, setSelectedLength] = useState<number | null>(hasLengths && uniqueLengths.length > 0 ? uniqueLengths[0] : null);

  const activeVariant = product.variants.find(
    (v) => v.diameter_mm === selectedDiameter && (hasLengths && selectedLength ? v.length_m === selectedLength : true)
  ) || availableVariants[0];

  const handleDiameterChange = (dia: number) => {
    setSelectedDiameter(dia);
    const newAvailable = product.variants.filter((v) => v.diameter_mm === dia);
    const newLengths = Array.from(new Set(newAvailable.map((v) => v.length_m))).filter(Boolean) as number[];
    if (hasLengths && selectedLength && !newLengths.includes(selectedLength)) {
      setSelectedLength(newLengths[0] || null);
    }
  };
  
  const localizedCategoryName = tCat.has(product.category) ? tCat(product.category) : product.category;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full relative group">
      <div className="h-40 bg-slate-100 border-b border-slate-200 flex flex-col items-center justify-center text-slate-400 group-hover:bg-slate-200 transition-colors">
         <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
         <span className="text-xs uppercase tracking-widest opacity-60">{t('noImage')}</span>
      </div>

      <div className="p-5 bg-white flex-none">
        <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1 block">
          {localizedCategoryName}
        </span>
        <h3 className="text-lg font-bold text-slate-900 leading-tight">{product.name}</h3>
      </div>
      
      <div className="px-5 pb-5 space-y-5 flex-grow flex flex-col">
        <p className="text-slate-600 text-sm flex-none line-clamp-2">{product.description}</p>
        
        <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-100 flex-none">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">{t('diameter')}</label>
              <select 
                className="w-full bg-white border border-slate-300 rounded py-1.5 px-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                value={selectedDiameter}
                onChange={(e) => handleDiameterChange(Number(e.target.value))}
              >
                {uniqueDiameters.map(dia => (
                  <option key={dia} value={dia}>Ø {dia} mm</option>
                ))}
              </select>
            </div>
            
            {hasLengths && uniqueLengths.length > 0 && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">{t('length')}</label>
                <select 
                  className="w-full bg-white border border-slate-300 rounded py-1.5 px-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                  value={selectedLength || ""}
                  onChange={(e) => setSelectedLength(Number(e.target.value))}
                >
                  {uniqueLengths.map(len => (
                    <option key={len} value={len}>{len} m</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {activeVariant && (
          <div className="grid grid-cols-2 gap-y-2 text-sm border-t border-slate-100 pt-3 flex-none">
            <div className="text-slate-500 text-xs">{t('sku')}:</div>
            <div className="font-mono text-xs text-right text-slate-900">{activeVariant.sku}</div>
            <div className="text-slate-500 text-xs">{t('price')}:</div>
            <div className="font-bold text-right text-orange-600">€{activeVariant.price.toFixed(2)}</div>
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-slate-100">
           <Link 
             href={/products/ + product.id} 
             className="w-full flex items-center justify-center bg-slate-900 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
           >
             {t('fullConfig')}
             <ArrowRight className="w-4 h-4 ml-2" />
           </Link>
        </div>
      </div>
    </div>
  );
}
