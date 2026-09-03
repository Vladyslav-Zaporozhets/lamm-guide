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
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl flex flex-col justify-start border border-slate-100 dark:border-slate-800">
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Рекомендована клема</p>
            <div className="text-5xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
              {matchedSize ? (matchedSize + ' мм') : 'N/A'}
            </div>
            
            {requiredSize !== matchedSize && matchedSize && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium bg-amber-50 dark:bg-amber-900/20 py-1 px-3 rounded-full inline-block">
                Округлено до найближчого розміру ({requiredSize}мм → {matchedSize}мм)
              </p>
            )}
            
            {!matchedSize && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium bg-red-50 dark:bg-red-900/20 py-1 px-3 rounded-full inline-block">
                Розмір {requiredSize}мм недоступний
              </p>
            )}
          </div>

          {matchedSize && productData && (
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Артикул:</span>
                <span className="font-mono font-medium text-slate-900 dark:text-white">{productData.sku}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Орієнтовна ціна:</span>
                <span className="font-bold text-lg text-slate-900 dark:text-white">{productData.price} €</span>
              </div>
            </div>
          )}

          {/* Dynamic Warnings */}
          <div className="mt-auto space-y-3">
            {mountType === 'flemish' && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 p-3 rounded-xl flex gap-3 text-yellow-800 dark:text-yellow-200 text-sm">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <strong>Увага: Фламандське око.</strong> Вимагає 4 послідовних опресування. <span className="underline">Заборонено</span> використовувати Seilgleiter (канатні напрямні) з цим типом з'єднання!
                </div>
              </div>
            )}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 p-3 rounded-xl flex gap-3 text-blue-800 dark:text-blue-200 text-sm">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                Максимальне робоче навантаження (WLL) залежить від характеристик самого канату (з осердям чи без) та суворо регулюється стандартом DIN EN 13411-3.
              </div>
            </div>
          </div>

          {matchedSize && productData && (
            <a 
              href={'https://www.lamm-seile.de/alu-seilpressklemme/' + productData.sku}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 py-3 px-4 rounded-xl font-bold transition-colors shadow-sm"
            >
              <ShoppingCart className="w-5 h-5" />
              Знайти на сайті
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

