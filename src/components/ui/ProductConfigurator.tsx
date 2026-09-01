"use client";
import { useState } from "react";
import { Ruler, Activity, Tag, ShoppingCart, ShieldCheck } from "lucide-react";

export default function ProductConfigurator({ product }: any) {
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
         <SettingsIcon className="w-5 h-5 mr-2 text-slate-400" />
         Konfiguration
      </h3>

      <div className="space-y-6">
        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Durchmesser (Діаметр)</label>
            {uniqueDiameters.length > 1 ? (
                <select 
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg py-3 px-4 text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-inner"
                  value={selectedDiameter}
                  onChange={(e) => handleDiameterChange(Number(e.target.value))}
                >
                  {uniqueDiameters.map((dia: any) => (
                    <option key={dia} value={dia}>Ø {dia} mm</option>
                  ))}
                </select>
            ) : (
                <div className="w-full bg-slate-100 border border-slate-200 rounded-lg py-3 px-4 text-base text-slate-700 font-medium cursor-not-allowed">
                   Ø {uniqueDiameters[0]} mm (Fest)
                </div>
            )}
          </div>
          
          {hasLengths && uniqueLengths.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Länge (Довжина)</label>
              {uniqueLengths.length > 1 ? (
                  <select 
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg py-3 px-4 text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-inner"
                    value={selectedLength || ""}
                    onChange={(e) => setSelectedLength(Number(e.target.value))}
                  >
                    {uniqueLengths.map(len => (
                      <option key={len} value={len}>{len} m</option>
                    ))}
                  </select>
              ) : (
                  <div className="w-full bg-slate-100 border border-slate-200 rounded-lg py-3 px-4 text-base text-slate-700 font-medium cursor-not-allowed">
                     {uniqueLengths[0]} m (Fest)
                  </div>
              )}
            </div>
          )}
        </div>

        {/* Dynamic Result Panel */}
        {activeVariant && (
          <div className="bg-slate-900 rounded-xl p-6 text-white mt-6 relative overflow-hidden">
             {/* Decorative background element */}
             <div className="absolute -right-4 -top-10 opacity-5 pointer-events-none">
                 <ShieldCheck className="w-48 h-48" />
             </div>

             <div className="grid grid-cols-2 gap-y-4 gap-x-6 relative z-10">
                <div>
                   <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Artikel-Nr. (SKU)</div>
                   <div className="font-mono text-sm">{activeVariant.sku}</div>
                </div>
                <div>
                   <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Mind. Bruchkraft</div>
                   <div className="font-bold text-lg text-emerald-400">{activeVariant.bruchkraft_kn} kN</div>
                </div>
                <div className="col-span-2 border-t border-slate-700 pt-4 mt-2 flex justify-between items-end">
                   <div>
                      <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Preis (inkl. MwSt.)</div>
                      <div className="text-3xl font-extrabold text-white">€{activeVariant.price.toFixed(2)}</div>
                   </div>
                   <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold flex items-center transition-colors shadow-lg shadow-orange-500/20">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      In den Warenkorb
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  )
}
