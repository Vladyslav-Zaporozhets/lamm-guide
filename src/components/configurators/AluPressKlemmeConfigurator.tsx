"use client";

import React, { useState } from 'react';
import { Settings2, ShoppingCart, AlertTriangle, Info } from 'lucide-react';

const PRICING = {
  1: { sku: '4003093010', price: '0,18' },
  2: { sku: '4003093020', price: '0,19' },
  3: { sku: '4003093030', price: '0,21' },
  4: { sku: '4003093040', price: '0,29' },
  5: { sku: '4003093050', price: '0,33' },
  6: { sku: '4003093060', price: '0,54' },
  7: { sku: '4003093070', price: '0,57' },
  8: { sku: '4003093080', price: '0,68' },
  9: { sku: '4003093090', price: '0,69' },
  10: { sku: '4003093100', price: '0,79' },
  11: { sku: '4003093110', price: '0,94' },
  12: { sku: '4003093120', price: '1,08' },
  13: { sku: '4003093130', price: '1,37' },
  14: { sku: '4003093140', price: '1,50' },
  16: { sku: '4003093160', price: '2,59' },
  18: { sku: '4003093180', price: '4,01' },
  20: { sku: '4003093200', price: '5,69' }
};

export function AluPressKlemmeConfigurator() {
  const [diameter, setDiameter] = useState<number>(10);
  const [ropeType, setRopeType] = useState<'standard' | 'compacted'>('standard');
  const [mountType, setMountType] = useState<'loop' | 'flemish'>('loop');

  const getRequiredClampSize = () => {
    return ropeType === 'compacted' ? diameter + 2 : diameter + 1;
  };

  const requiredSize = getRequiredClampSize();
  const availableSizes = Object.keys(PRICING).map(Number).sort((a, b) => a - b);
  const matchedSize = availableSizes.find(s => s >= requiredSize);
  const productData = matchedSize ? PRICING[matchedSize as keyof typeof PRICING] : null;

  return (
    <div className="not-prose my-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
      <div className="bg-blue-600 dark:bg-blue-700 p-6 text-white flex items-center gap-3">
        <Settings2 className="w-8 h-8" />
        <div>
          <h3 className="text-xl font-bold m-0">Конфігуратор опресувальної клеми</h3>
          <p className="text-blue-100 text-sm mt-1 m-0">Індивідуальний підбір за стандартом DIN EN 13411-3</p>
        </div>
      </div>
      
      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Step 1: Diameter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              1. Діаметр вашого канату (Seil-Ø)
            </label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="1" max="18" step="1" 
                value={diameter} 
                onChange={(e) => setDiameter(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400 w-16 text-center bg-blue-50 dark:bg-blue-900/30 py-1 rounded-lg">
                {diameter} мм
              </span>
            </div>
          </div>

          {/* Step 2: Rope Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              2. Конструкція канату
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button 
                onClick={() => setRopeType('standard')}
                className={"p-3 border rounded-xl text-left transition-all " + (ropeType === 'standard' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600')}
              >
                <div className="font-semibold text-slate-900 dark:text-white text-sm">Неущільнений</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Звичайний сталевий канат (Клема +1 мм)</div>
              </button>
              <button 
                onClick={() => setRopeType('compacted')}
                className={"p-3 border rounded-xl text-left transition-all " + (ropeType === 'compacted' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600')}
              >
                <div className="font-semibold text-slate-900 dark:text-white text-sm">Ущільнений</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Verdichtetes Forstseil (Клема +2 мм)</div>
              </button>
            </div>
          </div>

          {/* Step 3: Mounting Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              3. Конфігурація монтажу
            </label>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => setMountType('loop')}
                className={"p-3 border rounded-xl text-left transition-all " + (mountType === 'loop' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600')}
              >
                <div className="font-semibold text-slate-900 dark:text-white text-sm">Стандартна петля</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Канат простягається через клему, утворюючи петлю, і повертається назад.</div>
              </button>
              <button 
                onClick={() => setMountType('flemish')}
                className={"p-3 border rounded-xl text-left transition-all " + (mountType === 'flemish' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600')}
              >
                <div className="font-semibold text-slate-900 dark:text-white text-sm">Фламандське око (Flämisches Auge)</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Складніше з'єднання для максимальної міцності.</div>
              </button>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl flex flex-col justify-start border border-slate-200 dark:border-slate-700 shadow-inner">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Технічна специфікація</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">Alu-Pressklemme</h4>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              DIN EN 13411-3
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-bl-full -mr-4 -mt-4 z-0"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Необхідний розмір</p>
                <div className="text-5xl font-black text-slate-900 dark:text-white flex items-end gap-2">
                  {matchedSize ? (matchedSize + ' мм') : 'N/A'}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Кількість на 1 петлю</p>
                <div className="text-3xl font-bold text-slate-700 dark:text-slate-300">
                  {mountType === 'flemish' ? '4 шт' : '1 шт'}
                </div>
              </div>
            </div>
            
            {requiredSize !== matchedSize && matchedSize && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-4 font-medium bg-amber-50 dark:bg-amber-900/20 py-1 px-3 rounded-md border border-amber-100 dark:border-amber-900/50">
                ⚠️ Розрахунковий розмір ({requiredSize}мм) округлено до доступного ({matchedSize}мм)
              </p>
            )}
            
            {!matchedSize && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-4 font-medium bg-red-50 dark:bg-red-900/20 py-1 px-3 rounded-md border border-red-100 dark:border-red-900/50">
                ❌ Розмір {requiredSize}мм виходить за межі стандартного асортименту
              </p>
            )}
          </div>

          {matchedSize && productData && (
            <div className="space-y-3 mb-6 flex-grow">
              <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Артикул (SKU):</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{productData.sku}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Ціна за 1 шт:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{productData.price} €</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 bg-blue-50/50 dark:bg-blue-900/10 px-2 -mx-2 rounded-lg">
                <span className="font-semibold text-slate-900 dark:text-white">Загальна вартість:</span>
                <span className="font-black text-xl text-blue-600 dark:text-blue-400">
                  {(parseFloat(productData.price.replace(',', '.')) * (mountType === 'flemish' ? 4 : 1)).toFixed(2).replace('.', ',')} €
                </span>
              </div>
              
              {/* B2B Cross-selling Module */}
              {matchedSize <= 14 && (
                <div className="mt-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/50 p-3 rounded-xl flex gap-3 text-emerald-800 dark:text-emerald-200 text-sm">
                  <Settings2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Рекомендоване обладнання:</strong> Для опресування клем до 14 мм ідеально підійде гідравлічний прес <em>LUNA-Drahtseilklemmpresse 414</em>.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Dynamic Warnings */}
          <div className="space-y-3 mb-6">
            {mountType === 'flemish' && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 p-3 rounded-xl flex gap-3 text-yellow-800 dark:text-yellow-200 text-sm">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <strong>Увага:</strong> Заборонено використовувати Seilgleiter (канатні напрямні) з Фламандським оком!
                </div>
              </div>
            )}
          </div>

          {matchedSize && productData && (
            <a 
              href={'https://www.lamm-seile.de/alu-seilpressklemme/' + productData.sku}
              target="_blank"
              rel="noreferrer"
              className="mt-auto w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <ShoppingCart className="w-5 h-5" />
              Додати до кошика на Lamm-Seile
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

