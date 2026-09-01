import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import productsData from '@/data/products.json';
import { ArrowLeft, FileText, Info, Wrench, ShieldAlert, Image as ImageIcon, BookOpen } from 'lucide-react';

export default async function EncyclopediaArticle({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const resolvedParams = await params;
  const product = productsData.find(p => p.id === resolvedParams.id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/encyclopedia" className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zur Enzyklopädie
        </Link>
      </div>

      <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
         {/* Header / Hero */}
         <div className="bg-slate-900 px-8 py-12 text-center relative overflow-hidden">
            <BookOpen className="absolute -right-10 -bottom-10 w-64 h-64 text-slate-800 opacity-50 pointer-events-none" />
            <div className="relative z-10">
               <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 font-bold text-xs uppercase tracking-widest rounded-full mb-4">
                  {product.category}
               </span>
               <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                  {product.name}
               </h1>
            </div>
         </div>

         {/* Content Body */}
         <div className="p-8 md:p-12">
            
            {/* Big Image Placeholder */}
            <div className="w-full h-80 bg-slate-100 rounded-2xl mb-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 text-slate-400">
               <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
               <p className="font-semibold tracking-widest uppercase">Technisches Bild: {product.name}</p>
            </div>

            {/* Encyclopedia Text */}
            <div className="prose prose-lg prose-slate max-w-none mb-12">
               <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                  <FileText className="w-6 h-6 mr-3 text-blue-500" />
                  Technische Beschreibung & Einsatzgebiet
               </h2>
               <p className="whitespace-pre-line text-slate-600 leading-relaxed">
                  {product.description}
               </p>
            </div>

            {/* Smart Expert Knowledge Block */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Info className="w-32 h-32 text-blue-600" />
               </div>
               <h3 className="flex items-center text-xl font-bold text-blue-900 mb-4 relative z-10">
                  Expertenwissen (Порада Експерта)
               </h3>
               <div className="relative z-10 text-blue-800 leading-relaxed space-y-4">
                  {product.category.includes('Dyneema') && (
                     <>
                        <p><strong>Materialvorteil:</strong> Dyneema (UHMWPE) ist gewichtsbezogen bis zu 15-mal stärker als Stahl. Es schwimmt auf Wasser und ist extrem widerstandsfähig gegen Chemikalien und UV-Strahlung.</p>
                        <p className="text-red-700 font-bold flex items-center bg-red-100/50 p-3 rounded-lg border border-red-200">
                           <ShieldAlert className="w-5 h-5 mr-2" />
                           Achtung: Aufgrund des niedrigen Schmelzpunktes (ca. 144°C) darf dieses Seil keinesfalls auf Spillwinden verwendet werden!
                        </p>
                     </>
                  )}
                  {product.category.includes('Traktions') && (
                     <p><strong>Traktionseinsatz:</strong> Diese Seile werden auf extrem steilen Hängen eingesetzt, um schwere Forstmaschinen (Harvester/Forwarder) abzusichern. Die spezielle Kunststoffzwischenlage (PZ) verhindert, dass die äußeren Litzen an der Stahleinlage reiben, was die Lebensdauer massiv erhöht.</p>
                  )}
                  {product.category.includes('Hochverdichtete') && (
                     <p><strong>Verdichtung:</strong> Durch das Verdichten (Walzen) des Seils nach dem Schlagen wird die Oberfläche extrem glatt. Das Seil bekommt mehr metallischen Querschnitt und somit eine höhere Bruchlast. Außerdem schont es die Windentrommel und nimmt weniger Schmutz auf.</p>
                  )}
                  {product.category.includes('Standard') && (
                     <p><strong>Klassischer Einsatz:</strong> Standardseile bieten ein hervorragendes Preis-Leistungs-Verhältnis für den gelegentlichen Einsatz. Bei intensivem Rücken von Holz auf steinigem Untergrund empfiehlt sich jedoch der Wechsel zu hochverdichteten Seilen.</p>
                  )}
               </div>
            </div>

            {/* Cross-Selling / Required Accessories */}
            <div>
               <h3 className="flex items-center text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                  <Wrench className="w-6 h-6 mr-3 text-orange-500" />
                  Zubehör & Kompatibilität (Необхідні комплектуючі)
               </h3>
               <p className="text-slate-600 mb-6">
                 Ein Forstwindenseil ist ohne die richtigen Endverbindungen nicht einsatzbereit. Folgende Komponenten sind für dieses Produkt zwingend erforderlich oder hochgradig empfohlen:
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.compatibility && product.compatibility.map((comp, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                       <h4 className="font-bold text-slate-900 mb-2">{comp}</h4>
                       <p className="text-sm text-slate-500">
                          Wird benötigt, um das Seilende sicher mit Haken oder Schlaufen zu verbinden, ohne das Seil zu beschädigen.
                       </p>
                    </div>
                  ))}
                  
                  {product.category.includes('Dyneema') && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                       <h4 className="font-bold text-orange-900 mb-2">Dyneema Soft Schäkel</h4>
                       <p className="text-sm text-orange-700">
                          Die leichte Alternative zum Stahlschäkel. Zerkratzt nicht die Maschine und ist bei gleicher Bruchlast 10x leichter.
                       </p>
                    </div>
                  )}
               </div>
            </div>

         </div>
      </article>
    </div>
  );
}
