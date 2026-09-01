import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Tent } from 'lucide-react';
import { Link, routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import '../globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { CommandPalette } from '@/components/ui/CommandPalette';

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
  
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }
 
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
               <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                  {/* Logo / Brand */}
                  <Link href="/" className="flex items-center group">
                     <div className="bg-orange-500 text-white p-2 rounded-xl mr-3 group-hover:bg-orange-600 transition-colors shadow-sm">
                        <Tent className="w-6 h-6" />
                     </div>
                     <div>
                        <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white block leading-none">
                          Lamm GmbH
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mt-1">
                          Akademie
                        </span>
                     </div>
                  </Link>

                  {/* Right side - Lang & Theme */}
                  <div className="flex items-center space-x-4">
                     <CommandPalette />
                     <ThemeToggle />
                     <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <Link href="/" locale="de" className={`px-2 py-1 text-xs font-bold rounded transition-colors ${locale === 'de' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>DE</Link>
                        <Link href="/" locale="uk" className={`px-2 py-1 text-xs font-bold rounded transition-colors ${locale === 'uk' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>UK</Link>
                     </div>
                  </div>
               </div>
            </header>
            <main className="flex-grow">
               {children}
            </main>
            
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 transition-colors duration-300">
               <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                  &copy; {new Date().getFullYear()} Lamm GmbH. Всі права захищено. <br className="md:hidden" />Внутрішня база знань.
               </div>
            </footer>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
