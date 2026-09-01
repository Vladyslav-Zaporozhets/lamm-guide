import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Link} from '@/i18n/routing';
import { BookOpen, ShoppingBag } from 'lucide-react';
import './globals.css';

export async function generateMetadata({ params }: any) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Index'});
 
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({ children, params }: any) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  const messages = await getMessages();
 
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {/* Global Navigation */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
             <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                <div className="font-black text-xl tracking-tight flex items-center text-slate-800">
                   <span className="bg-orange-500 text-white px-2 py-1 rounded mr-2">Lamm</span>
                   Guide
                </div>
                <nav className="flex space-x-1">
                   <Link href="/" className="flex items-center px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Katalog
                   </Link>
                   <Link href="/encyclopedia" className="flex items-center px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Enzyklopädie
                   </Link>
                </nav>
             </div>
          </header>

          <main>
             {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
