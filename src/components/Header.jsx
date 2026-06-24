import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, CheckCircle2, ChevronDown, MapPin, Mail, Headphones, HeartHandshake } from 'lucide-react';
import logoImg from '../assets/images/logo.jpg';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setIsMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Routes', path: '/routes' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Blog', path: '/blog' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-[0_4px_20px_rgb(0,0,0,0.08)] bg-white/98 backdrop-blur-md' : 'bg-white shadow-sm'}`}>
      
      {/* Top Support Strip */}
      <div className="hidden md:block bg-[#f8f9fa] border-b border-slate-100 text-[11px] font-bold text-slate-500 py-1">
        <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto flex justify-between items-center md:-translate-x-6">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#00914d]"><Headphones size={13} /> 24/7 Customer Support</span>
            <span className="flex items-center gap-1.5"><HeartHandshake size={13} /> We are always here to help you!</span>
          </div>
          <div className="flex items-center gap-6 md:translate-x-12">
            <a href="mailto:info@urgenttaxis.com" className="flex items-center gap-1.5 hover:text-[#3b2b98] transition"><Mail size={12} /> info@urgenttaxis.com</a>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/p/Urgent-Taxis-100094316769562/" target="_blank" rel="noopener noreferrer" className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition shadow-sm" aria-label="Facebook">
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/urgent.taxis" target="_blank" rel="noopener noreferrer" className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center hover:opacity-80 transition shadow-sm" aria-label="Instagram">
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.youtube.com/@urgenttaxis" target="_blank" rel="noopener noreferrer" className="w-5 h-5 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-80 transition shadow-sm" aria-label="YouTube">
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
        <div className="flex items-center justify-between h-[60px] md:-translate-x-6">
          
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex-shrink-0 flex items-center h-full py-1">
            <img src={logoImg} alt="Urgent Taxis" className="h-full w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-[14px] font-bold text-slate-700 h-full ml-auto mr-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <a 
                  key={link.name} 
                  href={link.path}
                  className={`hover:text-[#00914d] transition flex items-center gap-1 h-full border-b-[3px] ${isActive ? 'text-[#00914d] border-[#00914d]' : 'border-transparent'}`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
 
          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-5 md:translate-x-12">
            <a href="tel:7310651940" className="flex items-center gap-3 hover:opacity-80 transition group">
              <div className="w-10 h-10 rounded-full bg-[#3b2b98] text-white flex items-center justify-center shadow-md">
                <Phone size={18} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#3b2b98] font-black text-[17px] leading-tight">7310 651 940</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Call us Anytime</span>
              </div>
            </a>
            
            <a 
              href="https://wa.me/918595066033" 
              target="_blank"
              rel="noreferrer"
              className="bg-[#00914d] text-white px-5 py-2.5 rounded-[12px] font-bold flex items-center gap-2 hover:bg-green-700 transition text-sm shadow-[0_4px_14px_rgba(0,145,77,0.39)]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.031 2a9.978 9.978 0 0 0-9.969 9.97c0 1.764.462 3.42 1.272 4.877L2 22l5.308-1.24a9.97 9.97 0 0 0 4.723 1.206h.004a9.98 9.98 0 0 0 9.97-9.97A9.979 9.979 0 0 0 12.031 2zm0 1.5c4.686 0 8.5 3.815 8.5 8.5a8.508 8.508 0 0 1-8.5 8.5c-1.58 0-3.064-.433-4.348-1.183l-.312-.183-3.23.754.772-3.12-.199-.319A8.47 8.47 0 0 1 3.5 12.003c0-4.686 3.814-8.503 8.531-8.503zm-3.05 4.545c-.174 0-.36.035-.506.198-.157.17-.601.586-.601 1.428 0 .842.613 1.658.7 1.77.086.115 1.182 1.892 2.915 2.585.41.164.73.263.98.341.413.13.79.112 1.087.067.33-.05 1.022-.417 1.164-.819.143-.404.143-.75.1-.82-.043-.073-.157-.116-.33-.203-.173-.087-1.022-.505-1.18-.563-.158-.058-.273-.087-.39.087-.114.17-.442.56-.542.672-.1.115-.2.128-.372.043-.173-.087-.732-.27-1.393-.86-.514-.458-.862-1.025-.963-1.197-.1-.173-.01-.267.076-.353.078-.077.173-.203.26-.304.086-.1.114-.173.173-.29.057-.115.028-.216-.014-.303-.043-.087-.39-.938-.533-1.282-.14-.337-.282-.29-.387-.295-.1-.005-.215-.005-.33-.005z"/></svg>
              WhatsApp
            </a>
          </div>
 
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-[#3b2b98] hover:text-blue-600 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
 
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-100/50 shadow-xl overflow-y-auto max-h-[calc(100vh-80px)]">
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <a
                  key={link.name}
                  href={link.path}
                  className={`py-2.5 border-b border-slate-100 text-[15px] font-bold ${isActive ? 'text-[#00914d]' : 'text-slate-700 hover:text-[#00914d]'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="mt-6 flex flex-row gap-2">
              <a href="tel:7310651940" className="bg-[#3b2b98] text-white font-bold py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md flex-1 text-sm">
                <Phone size={16} fill="currentColor" /> Call
              </a>
              <a href="https://wa.me/918595066033" className="bg-[#00914d] text-white font-bold py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md flex-1 text-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.031 2a9.978 9.978 0 0 0-9.969 9.97c0 1.764.462 3.42 1.272 4.877L2 22l5.308-1.24a9.97 9.97 0 0 0 4.723 1.206h.004a9.98 9.98 0 0 0 9.97-9.97A9.979 9.979 0 0 0 12.031 2zm0 1.5c4.686 0 8.5 3.815 8.5 8.5a8.508 8.508 0 0 1-8.5 8.5c-1.58 0-3.064-.433-4.348-1.183l-.312-.183-3.23.754.772-3.12-.199-.319A8.47 8.47 0 0 1 3.5 12.003c0-4.686 3.814-8.503 8.531-8.503zm-3.05 4.545c-.174 0-.36.035-.506.198-.157.17-.601.586-.601 1.428 0 .842.613 1.658.7 1.77.086.115 1.182 1.892 2.915 2.585.41.164.73.263.98.341.413.13.79.112 1.087.067.33-.05 1.022-.417 1.164-.819.143-.404.143-.75.1-.82-.043-.073-.157-.116-.33-.203-.173-.087-1.022-.505-1.18-.563-.158-.058-.273-.087-.39.087-.114.17-.442.56-.542.672-.1.115-.2.128-.372.043-.173-.087-.732-.27-1.393-.86-.514-.458-.862-1.025-.963-1.197-.1-.173-.01-.267.076-.353.078-.077.173-.203.26-.304.086-.1.114-.173.173-.29.057-.115.028-.216-.014-.303-.043-.087-.39-.938-.533-1.282-.14-.337-.282-.29-.387-.295-.1-.005-.215-.005-.33-.005z"/></svg>
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

