import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Tent } from 'lucide-react';
import { Link } from '@/i18n/routing';
import '../globals.css';

export const metadata = {
  title: 'Lamm GmbH Akademie',
  description: 'Wissenszentrum für Forsttechnik',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
             <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center group">
                  <div className="bg-orange-500 text-white p-2 rounded-xl mr-3 group-hover:bg-orange-600 transition-colors shadow-sm">
                    <Tent className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xl font-black tracking-tight text-slate-900 block leading-none">
                      Lamm GmbH
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mt-1">
                      Akademie
                    </span>
                  </div>
                </Link>
                
                <div className="flex items-center space-x-6">
                   <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
                      <Link href="/" locale="de" className={`px-2 py-1 text-xs font-bold rounded ${locale === 'de' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>DE</Link>
                      <Link href="/" locale="en" className={`px-2 py-1 text-xs font-bold rounded ${locale === 'en' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>EN</Link>
                      <Link href="/" locale="uk" className={`px-2 py-1 text-xs font-bold rounded ${locale === 'uk' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>UK</Link>
                   </div>
                </div>
             </div>
          </header>

          <main className="flex-grow">
            {children}
          </main>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
