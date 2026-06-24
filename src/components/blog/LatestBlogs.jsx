import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { blogData } from '../../data/blogData';

export default function LatestBlogs({ currentRoute = null }) {
  // If currentRoute is provided, prioritize blogs matching that route
  let blogsToShow = [];
  
  if (currentRoute) {
    const related = blogData.filter(b => b.targetRoutes?.includes(currentRoute));
    const others = blogData.filter(b => !b.targetRoutes?.includes(currentRoute));
    blogsToShow = [...related, ...others].slice(0, 3);
  } else {
    // Sort by date (newest first) or just show first 3
    blogsToShow = blogData.slice(0, 3);
  }

  if (blogsToShow.length === 0) return null;

  return (
    <div className="w-full bg-slate-50 py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-[#3b2b98] mb-2">
              {currentRoute ? 'Related Travel Guides' : 'Latest Travel Guides'}
            </h2>
            <p className="text-slate-600 font-medium">Insights, fare guides, and travel tips for your next journey.</p>
          </div>
          <Link to="/blog" className="text-[#00914d] font-bold hover:text-[#00914d] transition flex items-center gap-1 group">
            View All Guides <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsToShow.map((blog) => (
            <Link key={blog.slug} to={`/blog/${blog.slug}`} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow group flex flex-col h-full">
              <div className="relative h-48 overflow-hidden bg-slate-200">
                {blog.imageVerified ? (
                  <img src={blog.featuredImage} alt={blog.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                    <div className="text-center">
                      <span className="block text-sm font-bold uppercase mb-1">Image Not Verified</span>
                      <span className="block text-xs opacity-70">Source: {blog.sourceVerification}</span>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#3b2b98]">
                  {blog.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(blog.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {blog.author}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#3b2b98] transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {blog.excerpt}
                </p>
                <div className="text-[#00914d] font-bold text-sm flex items-center gap-1 mt-auto">
                  Read Full Guide <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
