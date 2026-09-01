import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import productsData from '@/data/products.json';
import { ArrowLeft, FileText, Info, Wrench, ShieldAlert, Image as ImageIcon, BookOpen, Video } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import ProductConfigurator from '@/components/ui/ProductConfigurator';

export default async function EncyclopediaArticle({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const resolvedParams = await params;
  const product = productsData.find(p => p.id === resolvedParams.id);
  const t = await getTranslations({locale: resolvedParams.locale, namespace: 'Encyclopedia'});
  
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/encyclopedia" className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('back')}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column: Educational Content */}
         <div className="lg:col-span-2 space-y-8">
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
                  
                  {/* Image & Video Gallery */}
                  {(product.images?.length > 0 || product.videos?.length > 0) ? (
                     <div className="mb-12 space-y-6">
                        {/* Main Images */}
                        {product.images && product.images.length > 0 && (
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {product.images.map((img: string, idx: number) => (
                                 <div key={idx} className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 aspect-video flex items-center justify-center">
                                    <img src={img} alt={`${product.name} - Image ${idx+1}`} className="w-full h-full object-cover" />
                                 </div>
                              ))}
                           </div>
                        )}
                        {/* Videos */}
                        {product.videos && product.videos.length > 0 && (
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {product.videos.map((vid: string, idx: number) => (
                                 <div key={idx} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 aspect-video relative">
                                    <iframe 
                                       className="absolute inset-0 w-full h-full"
                                       src={`https://www.youtube.com/embed/${vid}`}
                                       title="YouTube video player"
                                       frameBorder="0"
                                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                       allowFullScreen
                                    ></iframe>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  ) : (
                     <div className="w-full h-80 bg-slate-100 rounded-2xl mb-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 text-slate-400">
                        <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                        <p className="font-semibold tracking-widest uppercase">{t('imagePlaceholder')}: {product.name}</p>
                     </div>
                  )}

                  {/* Encyclopedia Text (Rich HTML with Tables) */}
                  <div className="prose prose-lg prose-slate max-w-none mb-12">
                     <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                        <FileText className="w-6 h-6 mr-3 text-blue-500" />
                        {t('technicalDesc')}
                     </h2>
                     {product.description_html ? (
                        <div className="text-slate-600 leading-relaxed custom-tables" dangerouslySetInnerHTML={{ __html: product.description_html }} />
                     ) : (
                        <p className="whitespace-pre-line text-slate-600 leading-relaxed">
                           {product.description}
                        </p>
                     )}
                  </div>

                  {/* Smart Expert Knowledge Block */}
                  {product.category.includes('Dyneema') || product.category.includes('Traktions') || product.category.includes('Hochverdichtete') || product.category.includes('Standard') ? (
                     <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                           <Info className="w-32 h-32 text-blue-600" />
                        </div>
                        <h3 className="flex items-center text-xl font-bold text-blue-900 mb-4 relative z-10">
                           {t('expertTip')}
                        </h3>
                        <div className="relative z-10 text-blue-800 leading-relaxed space-y-4">
                           {product.category.includes('Dyneema') && (
                              <p><strong>Materialvorteil:</strong> {t('catDyneema')}</p>
                           )}
                           {product.category.includes('Traktions') && (
                              <p><strong>Traktionseinsatz:</strong> {t('catTraktion')}</p>
                           )}
                           {product.category.includes('Hochverdichtete') && (
                              <p><strong>Verdichtung:</strong> {t('catHoch')}</p>
                           )}
                           {product.category.includes('Standard') && (
                              <p><strong>Klassischer Einsatz:</strong> {t('catStandard')}</p>
                           )}
                        </div>
                     </div>
                  ) : null}

                  {/* Cross-Selling / Required Accessories */}
                  {product.compatibility && product.compatibility.length > 0 && (
                     <div>
                        <h3 className="flex items-center text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                           <Wrench className="w-6 h-6 mr-3 text-orange-500" />
                           {t('accessories')}
                        </h3>
                        <p className="text-slate-600 mb-6">
                        {t('accessoriesDesc')}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {product.compatibility.map((comp: string, idx: number) => (
                           <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                              <h4 className="font-bold text-slate-900 mb-2">{comp}</h4>
                              <p className="text-sm text-slate-500">
                                 Zwingend erforderlich für die sichere Konfektionierung.
                              </p>
                           </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </article>
         </div>

         {/* Right Column: Configurator & Interactive Tools */}
         <div className="lg:col-span-1">
            <div className="sticky top-24">
               {product.variants && product.variants.length > 0 && (
                  <ProductConfigurator product={product} />
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
