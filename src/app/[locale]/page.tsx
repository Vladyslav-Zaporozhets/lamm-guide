"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import productsData from '@/data/products.json';
import categoriesTree from '@/data/categories.json';
import { Search, BookOpen, ChevronRight, Folder, FolderOpen, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Helper to find the path (array of nodes) to a specific category ID
function findPathToNode(nodes: any[], targetId: string, currentPath: any[] = []): any[] | null {
  for (const node of nodes) {
    const newPath = [...currentPath, node];
    if (node.id === targetId) return newPath;
    if (node.children) {
      const found = findPathToNode(node.children, targetId, newPath);
      if (found) return found;
    }
  }
  return null;
}

function EncyclopediaContent() {
  const t = useTranslations('Encyclopedia');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const catParam = searchParams.get('cat');
  const qParam = searchParams.get('q') || "";

  const [searchQuery, setSearchQuery] = useState(qParam);
  const [currentLevel, setCurrentLevel] = useState<any[]>(categoriesTree);
  const [path, setPath] = useState<any[]>([]);

  // Sync state from URL
  useEffect(() => {
    if (catParam) {
      const newPath = findPathToNode(categoriesTree, catParam);
      if (newPath && newPath.length > 0) {
        setPath(newPath);
        const currentNode = newPath[newPath.length - 1];
        setCurrentLevel(currentNode.children || []);
      }
    } else {
      setPath([]);
      setCurrentLevel(categoriesTree);
    }
  }, [catParam]);

  // Sync search input to URL query
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery) {
        params.set('q', searchQuery);
      } else {
        params.delete('q');
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300); // debounce
    return () => clearTimeout(handler);
  }, [searchQuery, pathname, router, searchParams]);

  const getProductsForCategory = (catName: string) => {
     return productsData.filter(p => p.category === catName || p.category.includes(catName));
  };

  const filteredProductsSearch = productsData.filter(p => {
     if(!searchQuery) return true;
     const q = searchQuery.toLowerCase();
     return p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)) || p.category.toLowerCase().includes(q);
  });

  const navigateTo = (categoryNode: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('cat', categoryNode.id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const navigateUp = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (path.length > 1) {
      // Go to parent category
      const parentNode = path[path.length - 2];
      params.set('cat', parentNode.id);
    } else {
      // Go to root
      params.delete('cat');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const goToRoot = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('cat');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const goToBreadcrumb = (node: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('cat', node.id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-24 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl ring-1 ring-white/20 mb-6 backdrop-blur-md">
             <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-medium">
            {t('description')}
          </p>

          <div className="max-w-3xl mx-auto relative group">
             <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
             </div>
             <input 
                type="text" 
                placeholder={t('searchPlaceholder') || "Пошук..."} 
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-5 pl-14 pr-6 text-white placeholder-slate-400 shadow-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 outline-none text-lg transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
         
         {!searchQuery ? (
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200">
               {/* Breadcrumbs Navigation */}
               <div className="flex items-center space-x-2 text-sm font-semibold text-slate-500 mb-8 overflow-x-auto pb-2">
                  <button onClick={goToRoot} className="hover:text-blue-600 flex items-center">
                     <Folder className="w-4 h-4 mr-1" /> База
                  </button>
                  {path.map((node, idx) => (
                     <div key={node.id} className="flex items-center">
                        <ChevronRight className="w-4 h-4 mx-1" />
                        <button 
                           onClick={() => goToBreadcrumb(node)}
                           className="hover:text-blue-600 whitespace-nowrap"
                        >
                           {node.name}
                        </button>
                     </div>
                  ))}
               </div>

               {/* Back Button if not at root */}
               {path.length > 0 && (
                  <button onClick={navigateUp} className="mb-6 flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors bg-blue-50 px-4 py-2 rounded-xl text-sm w-max">
                     <ChevronLeft className="w-4 h-4 mr-1" /> Назад
                  </button>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                  {/* Render Categories */}
                  {currentLevel.map(node => (
                     <button 
                        key={node.id}
                        onClick={() => navigateTo(node)}
                        className={`flex items-center p-4 rounded-2xl border transition-all text-left group bg-white border-slate-200 hover:border-blue-400 hover:shadow-lg ${node.children && node.children.length === 0 ? 'opacity-90' : ''}`}
                     >
                        <div className="w-16 h-16 rounded-xl shadow-sm mr-4 overflow-hidden relative bg-slate-100 flex-shrink-0">
                           {node.image ? (
                              <Image src={node.image} alt={node.name} fill sizes="64px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center text-blue-500">
                                 {node.children && node.children.length > 0 ? <FolderOpen className="w-8 h-8" /> : <Folder className="w-8 h-8 text-slate-400" />}
                              </div>
                           )}
                        </div>
                        <div className="flex-1">
                           <h3 className="font-bold text-slate-900 text-sm md:text-base leading-tight group-hover:text-blue-600 line-clamp-2">{node.name}</h3>
                           {node.children && node.children.length > 0 && (
                              <p className="text-xs text-slate-500 mt-1 font-medium">{node.children.length} підкатегорій</p>
                           )}
                        </div>
                        <div className="ml-2 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                           <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                        </div>
                     </button>
                  ))}
               </div>

               {/* Render Products for Current Level */}
               {(() => {
                  if (path.length > 0) {
                     const currentNode = path[path.length - 1];
                     const products = getProductsForCategory(currentNode.name);
                     if (products.length > 0) {
                        return (
                           <div className="border-t border-slate-100 pt-8 mt-4">
                              <h3 className="text-xl font-extrabold text-slate-900 mb-6">Товари у цій категорії ({products.length})</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                 {products.map(product => (
                                    <Link key={product.id} href={`/article/${product.id}`} className="group flex flex-col bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all overflow-hidden h-full">
                                       <div className="h-32 bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 transition-colors relative overflow-hidden">
                                          {product.images && product.images.length > 0 ? (
                                             <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                          ) : (
                                             <ImageIcon className="w-8 h-8 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 group-hover:text-blue-500" />
                                          )}
                                       </div>
                                       <div className="p-5 flex-grow flex flex-col justify-between bg-white">
                                          <h3 className="font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-700 transition-colors text-sm line-clamp-2">{product.name}</h3>
                                          <div className="inline-flex items-center text-xs font-bold text-blue-600 mt-2 group-hover:translate-x-1 transition-transform">
                                             {t('readArticle') || "Читати статтю"} <ChevronRight className="w-3 h-3 ml-1" />
                                          </div>
                                       </div>
                                    </Link>
                                 ))}
                              </div>
                           </div>
                        );
                     }
                  }
                  return null;
               })()}
            </div>
         ) : (
            /* Search Results View */
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200">
               <h3 className="text-xl font-extrabold text-slate-900 mb-6">Результати пошуку ({filteredProductsSearch.length})</h3>
               
               {filteredProductsSearch.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                     {filteredProductsSearch.map(product => (
                        <Link key={product.id} href={`/article/${product.id}`} className="group flex flex-col bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all overflow-hidden h-full">
                           <div className="h-32 bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 transition-colors relative overflow-hidden">
                              {product.images && product.images.length > 0 ? (
                                 <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                              ) : (
                                 <ImageIcon className="w-8 h-8 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 group-hover:text-blue-500" />
                              )}
                           </div>
                           <div className="p-5 flex-grow flex flex-col justify-between bg-white">
                              <div>
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{product.category}</span>
                                 <h3 className="font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-700 transition-colors text-sm line-clamp-2">{product.name}</h3>
                              </div>
                              <div className="inline-flex items-center text-xs font-bold text-blue-600 mt-2 group-hover:translate-x-1 transition-transform">
                                 {t('readArticle') || "Читати статтю"} <ChevronRight className="w-3 h-3 ml-1" />
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>
               ) : (
                  <div className="text-center py-20">
                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
                        <Search className="w-8 h-8" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-700 mb-2">{t('noProducts') || "Нічого не знайдено"}</h3>
                  </div>
               )}
            </div>
         )}
      </div>
    </div>
  );
}

import { Suspense } from 'react';
export default function EncyclopediaIndex() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
      <EncyclopediaContent />
    </Suspense>
  );
}
