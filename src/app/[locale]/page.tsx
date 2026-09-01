import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import productsData from '@/data/products.json';
import ProductCard from '@/components/ui/ProductCard';
 
export default function HomePage() {
  const t = useTranslations('Index');
  
  const categories = Array.from(new Set(productsData.map(p => p.category)));

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{t('title')}</h1>
          <p className="text-slate-500 mt-2 text-lg">{t('description')}</p>
        </div>
        <div className="flex gap-2 bg-white rounded-lg p-1 border shadow-sm">
          <Link href="/" locale="de" className="px-4 py-2 text-sm font-semibold rounded hover:bg-slate-100 transition-colors text-slate-700">Deutsch</Link>
          <Link href="/" locale="uk" className="px-4 py-2 text-sm font-semibold rounded hover:bg-slate-100 transition-colors text-slate-700">Українська</Link>
        </div>
      </div>
      
      <div className="space-y-16">
        {categories.map((category) => {
          const categoryProducts = productsData.filter(p => p.category === category);
          return (
            <section key={category}>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <span className="bg-orange-500 w-2 h-8 rounded-full mr-3"></span>
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryProducts.map(product => (
                  <ProductCard key={product.id} product={product as any} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
