import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="w-full bg-slate-50 border-b border-slate-200 py-3 px-4 sm:px-8 lg:px-12 z-20 relative pt-24 pb-3">
      <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <li className="flex items-center">
          <Link to="/" className="hover:text-[#3b2b98] flex items-center transition-colors">
            <Home size={14} className="mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              <ChevronRight size={14} className="mx-1 text-slate-400 flex-shrink-0" />
              {isLast ? (
                <span className="text-slate-800 font-semibold truncate max-w-[150px] sm:max-w-[300px]" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link to={item.url} className="hover:text-[#3b2b98] transition-colors truncate max-w-[120px] sm:max-w-[200px]">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
