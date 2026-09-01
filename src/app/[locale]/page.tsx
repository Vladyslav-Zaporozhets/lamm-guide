import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
 
export default function HomePage() {
  const t = useTranslations('Index');
  const c = useTranslations('Categories');
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">{t('title')}</h1>
          <p className="text-slate-600 mt-2">{t('description')}</p>
        </div>
        <div className="flex gap-2 bg-white rounded-lg p-1 border shadow-sm">
          <Link href="/" locale="de" className="px-3 py-1.5 text-sm font-medium rounded hover:bg-slate-100 transition-colors">DE</Link>
          <Link href="/" locale="uk" className="px-3 py-1.5 text-sm font-medium rounded hover:bg-slate-100 transition-colors">UK</Link>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4">{c('SEILE')}</h2>
        <ul className="space-y-4">
          <li className="border-l-2 border-orange-400 pl-4">
            <span className="font-semibold block text-lg mb-2">{c('Forstwindenseile')}</span>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="bg-slate-50 p-3 rounded-lg border border-slate-100">{c('Hochverdichtete')}</li>
              <li className="bg-slate-50 p-3 rounded-lg border border-slate-100">{c('Standard')}</li>
              <li className="bg-slate-50 p-3 rounded-lg border border-slate-100">{c('Dyneema')}</li>
              <li className="bg-slate-50 p-3 rounded-lg border border-slate-100">{c('Traktionswindenseile')}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
