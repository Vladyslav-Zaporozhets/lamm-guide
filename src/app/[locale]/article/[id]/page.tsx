import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import productsData from '@/data/products.json';
import { BookOpen, ImageIcon, Home, ChevronRight, ArrowLeft, Clock } from 'lucide-react';
import Image from 'next/image';
import { globSync } from 'glob';
import fs from 'fs';
import path from 'path';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { TableOfContents } from '@/components/ui/TableOfContents';
import { SmartBreadcrumbs } from '@/components/ui/SmartBreadcrumbs';
import { ProductCarousel } from '@/components/ui/ProductCarousel';
import { ProductVideos } from '@/components/ui/ProductVideos';
import { ArticleActions } from '@/components/ui/ArticleActions';

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
      <SmartBreadcrumbs 
        productName={product.name}
        productCategory={product.category}
        fromCatId={fromCat as string | undefined}
      />

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Table of Contents */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <TableOfContents markdown={markdownContent} />
        </aside>

        {/* Main Content Area */}
        <article className="flex-1 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden w-full lg:max-w-[calc(100%-18rem)]">
          {/* Header / Hero */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-10 md:px-12 md:py-14 text-center md:text-left overflow-hidden border-b border-slate-800">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <BookOpen className="absolute -right-4 -bottom-4 w-48 h-48 md:w-64 md:h-64 text-slate-700/30 rotate-12 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 font-bold text-xs uppercase tracking-widest rounded-full shadow-sm">
                        {product.category}
                    </span>
                    <span className="inline-flex items-center text-slate-400 text-sm font-medium bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      ~{Math.max(1, Math.ceil(markdownContent.split(/\s+/).length / 150))} хв читання
                    </span>
                  </div>
                  
                  <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight max-w-4xl tracking-tight">
                      {product.name}
                  </h1>
                </div>

                {/* Quick Actions (Print / Share) */}
                <ArticleActions title={product.name} />
              </div>
          </div>

          <div className="p-8 md:p-12">
              <div className="mb-12">
                <ProductCarousel images={product.images} productName={product.name} />
                <ProductVideos videos={product.videos} productName={product.name} />
              </div>

              {/* Rich Markdown Content Area */}
              <MarkdownRenderer content={markdownContent} />
          </div>
        </article>

      </div>
    </div>
  );
}
