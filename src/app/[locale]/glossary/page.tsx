import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
import glossaryData from '@/data/glossary.json';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { BookA, ChevronLeft, Image as ImageIcon } from 'lucide-react';

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  if (resolvedParams.locale !== 'uk') {
    notFound();
  }

  const t = await getTranslations('Encyclopedia');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Назад до бази
          </Link>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
              <BookA className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Словник термінів
            </h1>
          </div>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            Офіційний німецько-український глосарій термінів з лісової техніки та такелажу.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {glossaryData.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row group">
              
              <div className="w-full md:w-48 h-48 md:h-auto bg-slate-100 dark:bg-slate-800 relative flex-shrink-0 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                {item.image ? (
                  <Image src={item.image} alt={item.term_de} fill className="object-cover" sizes="(max-width: 768px) 100vw, 192px" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 group-hover:scale-110 transition-transform" />
                )}
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="mb-2">
                  <span className="inline-block px-2.5 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest rounded-md mb-3">
                    DE
                  </span>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                    {item.term_de}
                  </h2>
                </div>
                
                <div className="mb-4">
                  <span className="inline-block px-2.5 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md mb-2">
                    UK
                  </span>
                  <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
                    {item.term_uk}
                  </h3>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
