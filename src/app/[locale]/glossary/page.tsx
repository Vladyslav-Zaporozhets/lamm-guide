import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import glossaryData from '@/data/glossary.json';
import { GlossaryClient } from './GlossaryClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  if (resolvedParams.locale !== 'uk') {
    notFound();
  }

  return <GlossaryClient glossaryData={glossaryData} />;
}
