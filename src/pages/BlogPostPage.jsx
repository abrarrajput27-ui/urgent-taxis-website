import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogData } from '../data/blogData';
import SEOQuickLinks from '../components/SEOQuickLinks';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = blogData.find(b => b.slug === slug);
    if (found) {
      setPost(found);
    } else {
      setError("The blog post you're looking for doesn't exist or has been removed.");
    }
    setLoading(false);
  }, [slug]);

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans pb-20">
      <SEOHead 
        title={post ? (post.seoTitle || `${post.title} | Urgent Taxis`) : "Post Not Found"}
        description={post ? (post.seoDescription || `Read about ${post.title}`) : ""}
        canonicalUrl={post ? `https://urgenttaxis.com/blog/${post.slug}` : ""}
      />
      <Header />
      
      <main className="flex-grow pt-[60px] lg:pt-[70px]">
        {loading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
            <Loader className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading post...</p>
          </div>
        ) : error || !post ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white text-center px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">{error || "The blog post you're looking for doesn't exist or has been removed."}</p>
            <Link to="/blog" className="bg-[#3b2b98] text-white px-6 py-3 rounded-full font-bold shadow hover:bg-[#152e73]">
              Back to Blog
            </Link>
          </div>
        ) : (
          <>
            <div className="relative w-full h-[40vh] md:h-[50vh] bg-[#3b2b98]">
              {post.featuredImage && (
                <>
                  <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50"></div>
                </>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight max-w-[900px] drop-shadow-lg">
                  {post.title}
                </h1>
                <div className="flex items-center text-blue-100 font-medium">
                  <Calendar className="w-5 h-5 mr-2" />
                  {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>

            <div className="max-w-[800px] mx-auto px-4 mt-12 md:mt-16">
              <div className="mb-10">
                <Link to="/blog" className="text-gray-500 hover:text-[#3b2b98] font-medium flex items-center transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to all posts
                </Link>
              </div>

              <div className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-10 mb-6 text-[#3b2b98]" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900" {...props} />,
                    p: ({node, ...props}) => <p className="mb-6" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6" {...props} />,
                    li: ({node, ...props}) => <li className="mb-2" {...props} />,
                    a: ({node, ...props}) => <a className="text-[#00914d] hover:underline font-medium" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 bg-gray-50 p-4 rounded-r my-6" {...props} />,
                    img: ({node, ...props}) => <img className="rounded-xl shadow-md w-full my-8 object-cover" {...props} />
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between bg-blue-50/50 p-8 rounded-2xl">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                  <h4 className="text-lg font-bold text-gray-900">Need a reliable taxi?</h4>
                  <p className="text-gray-600 text-sm mt-1">Book your outstation cab instantly with Urgent Taxis.</p>
                </div>
                <Link to="/" className="bg-[#00914d] hover:bg-[#00914d] text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 whitespace-nowrap">
                  Book Now
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
      
      {!loading && !error && post && <SEOQuickLinks />}
      <Footer />
    </div>
  );
}
