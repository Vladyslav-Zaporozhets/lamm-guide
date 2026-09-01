import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import productsData from '@/data/products.json';
import { ArrowLeft, CheckCircle, Info, ShieldAlert, Settings, Wrench, FileText } from 'lucide-react';
import ProductConfigurator from '@/components/ui/ProductConfigurator';

export default async function ProductPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const resolvedParams = await params;
  const product = productsData.find(p => p.id === resolvedParams.id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Breadcrumbs & Back Button */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-orange-600 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zum Katalog
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Column: Visuals & Encyclopedia */}
          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50">
            <div className="aspect-square bg-white rounded-2xl border border-slate-200 mb-8 flex items-center justify-center text-slate-300">
               {/* Image Placeholder - later we map real images */}
               <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-slate-100 rounded-full mb-4 flex items-center justify-center">
                     <span className="text-4xl font-black text-slate-200">IMG</span>
                  </div>
                  <span className="text-sm font-semibold tracking-widest uppercase">Kein Bild</span>
               </div>
            </div>

            {/* Encyclopedia Content (Parsed from DB) */}
            <div className="space-y-8">
               <div>
                  <h3 className="flex items-center text-lg font-bold text-slate-900 mb-3">
                     <FileText className="w-5 h-5 mr-2 text-orange-500" />
                     Wissen & Einsatzgebiet (Енциклопедія)
                  </h3>
                  <div className="prose prose-slate prose-sm text-slate-600 leading-relaxed">
                     <p>{product.description}</p>
                  </div>
               </div>

               {/* Simulated expert knowledge based on category */}
               <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                  <h4 className="flex items-center font-bold text-blue-900 mb-2">
                     <Info className="w-4 h-4 mr-2 text-blue-600" />
                     Expertenwissen (Порада Експерта)
                  </h4>
                  <p className="text-sm text-blue-800">
                    {product.category.includes('Dyneema') && "Dyneema-Seile sind 10x leichter als Stahlseile und schwimmen auf dem Wasser. Achtung: Nicht für Spillwinden geeignet, da sie durch Reibungshitze schmelzen können!"}
                    {product.category.includes('Traktions') && "Traktionswindenseile haben eine Kunststoffzwischenlage (Plastik-Kern), um die innere Reibung zu minimieren. Sie werden primär für schwere Maschinen wie Harvester am Steilhang genutzt."}
                    {product.category.includes('Hochverdichtete') && "Hochverdichtete Seile haben eine glatte Oberfläche, wodurch sie die Windentrommel schonen und weniger Schmutz aufnehmen. Ideal für professionellen Einsatz."}
                    {product.category.includes('Standard') && "Klassische Stahlseile. Solide, preiswert, aber anfälliger für Abrieb und Verschmutzung als hochverdichtete Seile."}
                  </p>
               </div>
            </div>
          </div>

          {/* Right Column: Configurator & Cross-Selling */}
          <div className="p-8 lg:p-12">
            <span className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-2 block">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
              {product.name}
            </h1>

            {/* Client-side Configurator Component */}
            <ProductConfigurator product={product} />

            {/* Cross-Selling (Zubehör) */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="flex items-center text-lg font-bold text-slate-900 mb-4">
                   <Wrench className="w-5 h-5 mr-2 text-orange-500" />
                   Zubehör & Kompatibilität (Супутні товари)
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  Um eine sichere Verbindung zu gewährleisten, benötigen Sie folgende Endverbindungen:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.compatibility.map((comp, idx) => (
                    <div key={idx} className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 cursor-pointer transition-colors">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3 flex-shrink-0">
                         <Settings className="w-5 h-5 text-slate-400" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{comp}</span>
                    </div>
                  ))}
                  {/* Dynamic suggestion based on category */}
                  {product.category.includes('Dyneema') && (
                    <div className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 cursor-pointer transition-colors">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3 flex-shrink-0">
                         <Settings className="w-5 h-5 text-slate-400" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Dyneema Soft Schäkel</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
