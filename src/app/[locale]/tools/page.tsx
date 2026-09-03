import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { AluPressKlemmeConfigurator } from '@/components/configurators/AluPressKlemmeConfigurator';
import { Wrench } from 'lucide-react';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  if (resolvedParams.locale !== 'uk') {
    notFound(); // Only available in Ukrainian for now
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-2xl">
            <Wrench className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          Інструменти та конфігуратори
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
          Колекція інтерактивних калькуляторів та інструментів для точного підбору обладнання та комплектуючих.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {/* Tool 1: Alu Pressklemme */}
        <div>
          <AluPressKlemmeConfigurator />
        </div>
      </div>
    </div>
  );
}
