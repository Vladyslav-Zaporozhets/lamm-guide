"use client";
import { useState } from "react";
import { Ruler, Activity, CheckCircle, Tag, Wrench } from "lucide-react";

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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-5 border-b border-slate-100 bg-slate-50 flex-none">
        <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1 block">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
      </div>
      
      <div className="p-5 space-y-6 flex-grow flex flex-col">
        <p className="text-slate-600 text-sm flex-none">{product.description}</p>
        
        <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-100 flex-none">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Durchmesser</label>
              <select 
                className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
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
                <label className="block text-xs font-medium text-slate-500 mb-1">Länge</label>
                <select 
                  className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
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
          <div className="grid grid-cols-2 gap-y-3 text-sm border-t border-slate-100 pt-4 flex-none">
            <div className="flex items-center text-slate-600">
              <Tag className="w-4 h-4 mr-2 text-slate-400" />
              <span>SKU:</span>
            </div>
            <div className="font-mono font-medium text-right text-slate-900">{activeVariant.sku}</div>

            <div className="flex items-center text-slate-600">
              <Activity className="w-4 h-4 mr-2 text-slate-400" />
              <span>Bruchkraft:</span>
            </div>
            <div className="font-medium text-right text-slate-900">{activeVariant.bruchkraft_kn} kN</div>

            <div className="flex items-center text-slate-600">
              <Ruler className="w-4 h-4 mr-2 text-slate-400" />
              <span>Preis:</span>
            </div>
            <div className="font-bold text-right text-orange-600 text-lg">€{activeVariant.price.toFixed(2)}</div>
          </div>
        )}
        
        <div className="mt-auto"></div>

        {product.compatibility && product.compatibility.length > 0 && (
          <div className="border-t border-slate-100 pt-4 mt-auto">
            <div className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <Wrench className="w-3 h-3 mr-1" />
              Zubehör / Kompatibilität
            </div>
            <div className="flex flex-wrap gap-2">
              {product.compatibility.map((comp, idx) => (
                <span key={idx} className="inline-flex items-center px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200 text-xs font-medium">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {comp}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
