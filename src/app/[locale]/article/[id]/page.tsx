import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import productsData from '@/data/products.json';
import { ArrowLeft, BookOpen, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { globSync } from 'glob';
import fs from 'fs';
import path from 'path';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { TableOfContents } from '@/components/ui/TableOfContents';

export function generateStaticParams() {
  const params: { id: string; locale: string }[] = [];
  productsData.forEach((product) => {
    routing.locales.forEach((locale) => {
      params.push({ id: product.id, locale });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const resolvedParams = await params;
  const product = productsData.find(p => p.id === resolvedParams.id);
  if (!product) return {};
  
  return {
    title: `${product.name} | Forsttechnik Akademie`,
    description: product.description || `Детальна інформація про ${product.name}`,
  };
}

export default async function ArticlePage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string, locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const fromCat = resolvedSearchParams.from;
  
  const product = productsData.find(p => p.id === resolvedParams.id);
  const t = await getTranslations({locale: resolvedParams.locale, namespace: 'Encyclopedia'});
  
  if (!product) {
    notFound();
  }

  // Find the corresponding markdown file
  let markdownContent = '';
  const searchPattern = path.join(process.cwd(), `encyclopedia_docs/**/${product.id}.md`).replace(/\\/g, '/');
  const files = globSync(searchPattern);
  
  if (files.length > 0) {
    markdownContent = fs.readFileSync(files[0], 'utf8');
  } else {
    // Fallback if no markdown found, but we want to use markdown ideally
    markdownContent = `# ${product.name}\n\n*Файл маркдауну не знайдено.*`;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link href={fromCat ? `/?cat=${fromCat}` : "/"} className="inline-flex items-center px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors shadow-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('back')}
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Table of Contents */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <TableOfContents markdown={markdownContent} />
        </aside>

        {/* Main Content Area */}
        <article className="flex-1 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden w-full lg:max-w-[calc(100%-18rem)]">
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

          <div className="p-8 md:p-12">
              {/* Image & Video Gallery */}
              {((product.images && product.images.length > 0) || (product.videos && product.videos.length > 0)) ? (
                <div className="mb-12 space-y-6">
                    {/* Main Images */}
                    {product.images && product.images.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {product.images.map((img: string, idx: number) => (
                            <div key={idx} className="bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 aspect-video flex items-center justify-center relative">
                                <Image src={img} alt={`${product.name} - Image ${idx+1}`} fill priority={idx < 2} className="object-cover" />
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
                <div className="w-full h-80 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 text-slate-400">
                    <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                    <p className="font-semibold tracking-widest uppercase">{t('imagePlaceholder')}: {product.name}</p>
                </div>
              )}

              {/* Rich Markdown Content Area */}
              <MarkdownRenderer content={markdownContent} />
          </div>
        </article>

      </div>
    </div>
  );
}
