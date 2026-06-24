import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogData } from '../data/blogData';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate fetch
    setBlogs(blogData);
    setLoading(false);
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <SEOHead 
        title="Travel Blog | Urgent Taxis"
        description="Read the latest travel tips, destination guides, and taxi fare updates from Urgent Taxis."
      />
      <Header />
      
      <main className="flex-grow pt-[60px] lg:pt-[70px]">
        <div className="bg-[#3b2b98] text-white py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Travel Blog</h1>
          <p className="text-blue-100 text-lg">Your guide to hassle-free travel across India.</p>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 py-16">
          {loading ? (
            <div className="text-center text-gray-500 py-20">Loading blogs...</div>
          ) : blogs.length === 0 ? null : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((b) => (
                <div key={b.slug} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group flex flex-col">
                  <Link to={`/blog/${b.slug}`} className="block relative overflow-hidden aspect-[16/9]">
                    {b.featuredImage ? (
                      <img src={b.featuredImage} alt={b.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-200">
                        <span className="text-4xl font-bold">UT</span>
                      </div>
                    )}
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-gray-400 text-sm font-medium mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(b.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#3b2b98] transition-colors">
                      <Link to={`/blog/${b.slug}`}>{b.title}</Link>
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">{b.seoDescription}</p>
                    <Link to={`/blog/${b.slug}`} className="text-[#00914d] font-bold text-sm flex items-center hover:text-[#00914d]">
                      Read More <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
