import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import productsData from '@/data/products.json';
import { BookOpen, ImageIcon, Home, ChevronRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { globSync } from 'glob';
import fs from 'fs';
import path from 'path';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { TableOfContents } from '@/components/ui/TableOfContents';
import { SmartBreadcrumbs } from '@/components/ui/SmartBreadcrumbs';
import { ProductCarousel } from '@/components/ui/ProductCarousel';
import { ProductVideos } from '@/components/ui/ProductVideos';

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
