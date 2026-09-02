import { Link } from '@/i18n/routing';
import { Home, ChevronRight, ArrowLeft } from 'lucide-react';
import categoriesData from '@/data/categories.json';

interface CategoryNode {
  id: string;
  name: string;
  level: number;
  children?: CategoryNode[];
}

function findPathByName(nodes: CategoryNode[], targetName: string, currentPath: { node: CategoryNode, siblings: CategoryNode[] }[] = []): { node: CategoryNode, siblings: CategoryNode[] }[] | null {
  for (const node of nodes) {
    const newPath = [...currentPath, { node, siblings: nodes }];
    if (node.name === targetName) return newPath;
    if (node.children) {
      const found = findPathByName(node.children, targetName, newPath);
      if (found) return found;
    }
  }
  return null;
}

export function SmartBreadcrumbs({ 
  productName, 
  productCategory,
  fromCatId
}: { 
  productName: string;
  productCategory: string;
  fromCatId?: string;
}) {
  const path = findPathByName(categoriesData as CategoryNode[], productCategory) || [];

  return (
    <div className="flex items-center space-x-4 mb-8 text-sm">
      {/* Back Button */}
      <Link 
        href={fromCatId ? `/?cat=${fromCatId}` : "/"} 
        className="inline-flex items-center justify-center w-10 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors shadow-sm flex-shrink-0"
        title="Назад"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 flex-shrink-0"></div>

      {/* Minimalist Smart Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 font-medium text-slate-600 dark:text-slate-400 overflow-visible">
        
        {/* Home */}
        <div className="relative group flex items-center">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center px-2 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900">
            <Home className="w-4 h-4 mr-1.5" />
            Академія
          </Link>
          
          <div className="absolute top-full left-0 mt-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl w-64 p-1.5 transform origin-top scale-95 group-hover:scale-100">
            {categoriesData.map(c => (
              <Link key={c.id} href={`/?cat=${c.id}`} className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 truncate">
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Path Items */}
        {path.map((item, idx) => (
          <div key={item.node.id} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-1 flex-shrink-0" />
            <div className="relative group flex items-center">
              <Link href={`/?cat=${item.node.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 truncate max-w-[200px] md:max-w-none">
                {item.node.name}
              </Link>
              
              {/* Dropdown of Siblings */}
              {item.siblings.length > 1 && (
                <div className="absolute top-full left-0 mt-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl w-64 p-1.5 transform origin-top scale-95 group-hover:scale-100">
                  {item.siblings.map(sib => (
                    <Link key={sib.id} href={`/?cat=${sib.id}`} className={`block px-3 py-2 text-sm rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 truncate ${sib.id === item.node.id ? 'bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-300'}`}>
                      {sib.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Current Product */}
        <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-1 flex-shrink-0" />
        <span className="text-slate-900 dark:text-slate-200 px-2 py-1.5 font-bold truncate max-w-[200px] md:max-w-[300px]" title={productName}>
          {productName}
        </span>

      </nav>
    </div>
  );
}
