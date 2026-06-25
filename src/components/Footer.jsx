import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { getCurrentLocationConfig } from '../lib/location';
import { getCityRouteConfig } from '../config/locationRoutes';

import logoImg from '../assets/images/logo.jpg';
import CtaBand from './CtaBand';

// Social Icons
const FacebookIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const InstagramIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const YoutubeIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;

export default function Footer() {
  const currentLocation = getCurrentLocationConfig();
  const cityRouteConfig = getCityRouteConfig();
  const phone = currentLocation.phone;
  const address = currentLocation.address;
  const displayPhone = phone.replace('+91', '+91 ');

  return (
    <>
      <CtaBand />
      <footer className="bg-[#0B132B] text-gray-400 pt-10 pb-4">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-8 mb-6 items-start">
          
          {/* Col 1: Brand */}
          <div className="pr-0 lg:pr-4 h-full">
            <div className="mb-6">
              <Link to="/">
                <img src={logoImg} alt="Urgent Taxis" className="h-[45px] w-auto rounded-md mix-blend-lighten" />
              </Link>
            </div>
            <p className="text-[14px] text-gray-400 mb-8 font-medium leading-[1.8]">
              Your reliable travel partner for outstation trips, local rentals and airport transfers across India.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/p/Urgent-Taxis-100094316769562/" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white p-2.5 rounded-full hover:opacity-80 transition" aria-label="Facebook">
                <FacebookIcon className="w-[15px] h-[15px]" />
              </a>
              <a href="https://www.instagram.com/urgent.taxis" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white p-2.5 rounded-full hover:opacity-80 transition" aria-label="Instagram">
                <InstagramIcon className="w-[15px] h-[15px]" />
              </a>
              <a href="https://www.youtube.com/@urgenttaxis" target="_blank" rel="noopener noreferrer" className="bg-[#FF0000] text-white p-2.5 rounded-full hover:opacity-80 transition" aria-label="YouTube">
                <YoutubeIcon className="w-[15px] h-[15px]" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4 text-[14px] font-medium">
              <li><a href="/" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Home</a></li>
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Our Services</Link></li>
              <li><Link to="/fleet" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Our Fleet</Link></li>
              <li><Link to="/routes" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Popular Routes</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Reviews</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Our Services</h4>
            <ul className="space-y-4 text-[14px] font-medium">
              <li><Link to="/service/outstation-one-way" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Outstation One Way Taxi</Link></li>
              <li><Link to="/service/outstation-round-trip" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Outstation Round Trip Taxi</Link></li>
              <li><Link to="/service/airport-transfer" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Airport Transfer</Link></li>
              <li><Link to="/service/local-rental" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Local Rental</Link></li>
              <li><Link to="/service/tour-packages" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Tour Packages</Link></li>
            </ul>
          </div>

          {/* Col 4: Top Routes */}
          <div>
            <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Top Routes</h4>
            <ul className="space-y-3.5 text-[14px] font-medium mb-8">
              <li><Link to="/delhi-to-haridwar-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Haridwar</Link></li>
              <li><Link to="/delhi-to-dehradun-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Dehradun</Link></li>
              <li><Link to="/delhi-to-haldwani-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Haldwani</Link></li>
              <li><Link to="/delhi-to-rishikesh-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Rishikesh</Link></li>
              <li><Link to="/delhi-to-shimla-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Shimla</Link></li>
            </ul>
          </div>
            
          {/* Col 5: Contact Us */}
          <div>
            <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-4 text-[14px] font-medium">
              <li className="flex items-start">
                <Phone className="w-[18px] h-[18px] mr-3 text-white flex-shrink-0 mt-0.5 fill-current" />
                <a href={`tel:${phone}`} className="text-white font-bold tracking-wide">{displayPhone}</a>
              </li>
              <li className="flex items-start">
                <Mail className="w-[18px] h-[18px] mr-3 text-white flex-shrink-0 mt-0.5" />
                <a href="mailto:info@urgenttaxis.com" className="text-white hover:opacity-80 transition-opacity">info@urgenttaxis.com</a>
              </li>
              <li className="flex items-start pr-4 sm:pr-0">
                <MapPin className="w-[18px] h-[18px] mr-3 text-white flex-shrink-0 mt-1" />
                <span className="text-white leading-relaxed text-[13px] sm:text-[14px] break-words">{address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Popular City Taxi Services */}
        <div className="border-t border-slate-800/80 pt-8 pb-6 mt-4">
          <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Popular City Taxi Services</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6 text-[14px] font-medium">
            <Link to="/taxi-service-in/delhi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Taxi Service in Delhi</Link>
            <Link to="/taxi-service-in/noida" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Taxi Service in Noida</Link>
            <Link to="/taxi-service-in/ghaziabad" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Taxi Service in Ghaziabad</Link>
            <Link to="/taxi-service-in/gurugram" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Taxi Service in Gurugram</Link>
            <Link to="/taxi-service-in/haldwani" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Taxi Service in Haldwani</Link>
            <Link to="/taxi-service-in/nainital" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Taxi Service in Nainital</Link>
            <Link to="/taxi-service-in/haridwar" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Taxi Service in Haridwar</Link>
            <Link to="/taxi-service-in/rishikesh" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Taxi Service in Rishikesh</Link>
          </div>
        </div>

        {/* Airport Routes Section */}
        <div className="border-t border-slate-800/80 pt-8 pb-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Jewar Airport Routes */}
            <div>
              <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Jewar Airport Routes</h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[14px] font-medium">
                <Link to="/noida-international-airport-to-delhi-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Jewar to Delhi</Link>
                <Link to="/noida-international-airport-to-agra-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Jewar to Agra</Link>
                <Link to="/noida-international-airport-to-haldwani-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Jewar to Haldwani</Link>
                <Link to="/noida-international-airport-to-nainital-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Jewar to Nainital</Link>
                <Link to="/noida-international-airport-to-haridwar-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Jewar to Haridwar</Link>
                <Link to="/noida-international-airport-to-rishikesh-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Jewar to Rishikesh</Link>
              </div>
            </div>

            {/* Delhi Airport Routes */}
            <div>
              <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Delhi Airport Routes</h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[14px] font-medium">
                <Link to="/delhi-airport-to-chandigarh-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> IGI to Chandigarh</Link>
                <Link to="/delhi-airport-to-agra-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> IGI to Agra</Link>
                <Link to="/delhi-airport-to-haldwani-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> IGI to Haldwani</Link>
                <Link to="/delhi-airport-to-nainital-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> IGI to Nainital</Link>
                <Link to="/delhi-airport-to-dehradun-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> IGI to Dehradun</Link>
                <Link to="/delhi-airport-to-rishikesh-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> IGI to Rishikesh</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-800/80 pt-4 flex flex-col md:flex-row justify-between items-center text-[13px] font-medium text-gray-500">
          <p className="mb-2 md:mb-0">© 2026 Urgent Taxis. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <span className="text-gray-700">|</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
        </div>
      </footer>
    </>
  );
}
