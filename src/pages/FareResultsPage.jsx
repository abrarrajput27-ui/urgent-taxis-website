import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { baseVehicles } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingCard from '../components/BookingCard';
import LocationInput from '../components/LocationInput';
import { getRouteDistance } from '../lib/mapsApi';
import { getAllVehicleFares } from '../lib/pricingEngine';
import { TRIP_TYPES } from '../lib/pricingRules';
import { useJsApiLoader } from '@react-google-maps/api';
import { Search, Filter, ShieldCheck, CheckCircle2, ChevronRight, Calendar, Users, Car, Info, ChevronDown, ChevronUp, MapPin, ArrowRight, Navigation, Map, RefreshCcw, CreditCard, AlertCircle, MessageCircle, Loader2, Briefcase, Check, Clock } from 'lucide-react';

import hatchbackImg from '../assets/images/Hatchback.png';
import sedanImg from '../assets/images/Sedan.png';
import ertigaImg from '../assets/images/Ertiga.png';
import muvImg from '../assets/images/MUV.png';
import innovaImg from '../assets/images/innova.png';
import premiumSuvImg from '../assets/images/premium suv.png';
import travellerImg from '../assets/images/tempo traveller.png';
import urbaniaImg from '../assets/images/urbania.png';
import urbania16Img from '../assets/images/Urbnia.png';
import busImg from '../assets/images/volvo bus.png';

const VEHICLE_IMAGES = {
  "Hatchback": hatchbackImg,
  "Sedan": sedanImg,
  "Ertiga": ertigaImg,
  "MUV": muvImg,
  "SUV": premiumSuvImg,
  "Innova": innovaImg,
  "Innova Crysta": innovaImg,
  "Minibus": travellerImg,
  "Traveller 12": travellerImg,
  "Traveller 16": travellerImg,
  "Traveller 20": travellerImg,
  "Traveller 26": travellerImg,
  "Urbania 12": urbaniaImg,
  "Urbania 16": urbania16Img,
  "Bus 27": busImg,
  "Bus 45": busImg
};

const libraries = ['places'];

const isHillStation = (pickup, drop) => {
  const hillKeywords = ['shimla', 'manali', 'nainital', 'mussoorie', 'dehradun', 'rishikesh', 'haridwar', 'katra', 'jammu', 'kashmir', 'himachal', 'uttarakhand', 'darjeeling', 'gangtok', 'ooty', 'munnar', 'kodaikanal', 'mcleodganj', 'dharamshala'];
  const p = (pickup || '').toLowerCase();
  const d = (drop || '').toLowerCase();
  return hillKeywords.some(kw => p.includes(kw) || d.includes(kw));
};

export default function FareResultsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [isEditingSearch, setIsEditingSearch] = useState(false);
  
  // Filter States
  const [cabTypes, setCabTypes] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [cabModels, setCabModels] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  const navigate = useNavigate();
  const location = useLocation();
  const { bookingData = {}, calculatedFares = [], calculatedDistance = 0, routeResult = null } = location.state || {};

  // Form states for inline editing
  const [editPickup, setEditPickup] = useState(bookingData.pickup || '');
  const [editDrop, setEditDrop] = useState(bookingData.drop || '');
  const [editDate, setEditDate] = useState(bookingData.date || '');
  const [editTime, setEditTime] = useState(bookingData.time || '');
  const [editReturnDate, setEditReturnDate] = useState(bookingData.returnDate || '');
  const [editLocalPackage, setEditLocalPackage] = useState(bookingData.packageType || '8hr/80km');
  const [editTripType, setEditTripType] = useState(bookingData.tripType || 'One Way');
  const [isTripTypeOpen, setIsTripTypeOpen] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showTrustInfo, setShowTrustInfo] = useState(false);
  const trustInfoRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (trustInfoRef.current && !trustInfoRef.current.contains(event.target)) {
        setShowTrustInfo(false);
      }
    }
    if (showTrustInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTrustInfo]);

  const [addons, setAddons] = useState({});
  const handleAddonChange = (cabCategory, addonType, isChecked) => {
    setAddons(prev => ({
      ...prev,
      [cabCategory]: {
        ...(prev[cabCategory] || {}),
        [addonType]: isChecked
      }
    }));
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const hasMapsKey = !!(apiKey && apiKey.trim() !== "");
  const { isLoaded: mapsScriptLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: libraries
  });
  const isLoaded = hasMapsKey && mapsScriptLoaded;

  useEffect(() => {
    if (!location.state || !calculatedFares || calculatedFares.length === 0) {
      navigate('/');
    }
  }, [location.state, navigate, calculatedFares]);

  const tripType = bookingData.tripType || 'One Way';
  const pickup = bookingData.pickup || '';
  const drop = bookingData.drop || '';
  const date = bookingData.date || '';
  const time = bookingData.time || '';
  
  const isHillRoute = isHillStation(pickup, drop);

  const handleUpdateSearch = async (e) => {
    if (e) e.preventDefault();
    setIsCalculating(true);
    if (!editPickup || !editDate || !editTime) {
      alert("Please fill all required fields");
      return;
    }
    if (editTripType !== TRIP_TYPES.LOCAL && !editDrop) {
      alert("Please fill drop location");
      return;
    }
    if (editTripType === TRIP_TYPES.ROUND_TRIP && !editReturnDate) {
      alert("Please fill return date");
      return;
    }
    
    setIsCalculating(true);
    try {
      const routeResult = editTripType === TRIP_TYPES.LOCAL ? 
                        { distanceKm: 0, tollsAndTaxes: 0, source: 'local', distanceSource: 'local', isUnknownRoute: false } : 
                        await getRouteDistance(editPickup, editDrop);
      
      if (!routeResult || routeResult.distanceKm === null || routeResult.distanceKm === undefined) {
        throw new Error("Unable to calculate route distance. Please check pickup/drop address.");
      }

      const fares = getAllVehicleFares({
        tripType: editTripType,
        distanceKm: routeResult.distanceKm,
        estimatedToll: routeResult.estimatedToll,
        estimatedStateTax: routeResult.estimatedStateTax,
        tollCount: routeResult.tollCount,
        travelTime: routeResult.travelTime,
        routeSource: routeResult.source,
        distanceSource: routeResult.distanceSource,
        isUnknownRoute: routeResult.isUnknownRoute,
        pickupDate: editDate,
        returnDate: editReturnDate,
        localPackage: editLocalPackage,
        pickupTime: editTime
      });

      if (fares.length === 0) throw new Error("Could not calculate fares");

      // Reload FareResultsPage with new data
      navigate('/fare-results', {
        state: {
          bookingData: { tripType: editTripType, pickup: editPickup, drop: editDrop, date: editDate, time: editTime, returnDate: editReturnDate, packageType: editLocalPackage },
          calculatedDistance: routeResult.distanceKm,
          calculatedFares: fares,
          routeResult: routeResult
        },
        replace: true
      });
      
    } catch (err) {
      console.error("Error updating search:", err);
      alert(err.message || "Unable to update search route.");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleFilterChange = (setter, state, value) => {
    if (state.includes(value)) {
      setter(state.filter(item => item !== value));
    } else {
      setter([...state, value]);
    }
  };

  const clearFilters = () => {
    setCabTypes([]);
    setFuelTypes([]);
    setCabModels([]);
  };

  const MAPPING_GROUPS = {
    'Hatchback': ['Hatchback'],
    'Sedan': ['Sedan'],
    'MUV': ['Ertiga', 'Carens', 'Triber', 'MUV'],
    'SUV': ['SUV', 'Innova', 'Innova Crysta'],
    'Minibus': ['Minibus', 'Traveller 12', 'Traveller 16', 'Traveller 20', 'Traveller 26', 'Urbania 12', 'Urbania 16'],
    'Bus': ['Bus 27', 'Bus 45']
  };

  // Compute Category Prices for Top Tabs
  const categoryPrices = useMemo(() => {
    if (!calculatedFares || calculatedFares.length === 0) return [];
    
    const minAll = Math.min(...calculatedFares.map(c => c.totalFare));
    const tabs = [{ id: 'All', label: 'All Cabs', price: minAll }];

    Object.keys(MAPPING_GROUPS).forEach(group => {
      const cabsInGroup = calculatedFares.filter(c => MAPPING_GROUPS[group].includes(c.category));
      if (cabsInGroup.length > 0) {
        tabs.push({
          id: group,
          label: group,
          price: Math.min(...cabsInGroup.map(c => c.totalFare))
        });
      }
    });

    return tabs;
  }, [calculatedFares]);

  // Compute Results
  const filteredVehicles = useMemo(() => {
    if (!calculatedFares) return [];
    return calculatedFares.filter(v => {
      // Tab filter
      if (activeTab !== 'All') {
        if (!MAPPING_GROUPS[activeTab]?.includes(v.category)) return false;
      }
      
      // Sidebar Filters
      if (cabTypes.length > 0) {
        let matched = false;
        cabTypes.forEach(type => {
          if (MAPPING_GROUPS[type] && MAPPING_GROUPS[type].includes(v.category)) matched = true;
          else if (v.category === type) matched = true; // Fallback
        });
        if (!matched) return false;
      }

      if (fuelTypes.length > 0 && !fuelTypes.includes(v.fuelType)) return false;
      if (cabModels.length > 0 && !cabModels.some(model => v.description && v.description.toLowerCase().includes(model.toLowerCase()))) return false;
      // Pre-booking vehicle filter
      if (bookingData.vehicle && bookingData.vehicle !== '' && v.category.toLowerCase() !== bookingData.vehicle.toLowerCase()) return false;
      
      return true;
    });
  }, [cabTypes, fuelTypes, cabModels, calculatedFares, bookingData, activeTab]);

  const handleBookNow = (cab) => {
    let message = `*Urgent Taxis Booking Request*\n\n`;
    message += `*Trip Type:* ${tripType}\n`;
    message += `*Pickup:* ${pickup}\n`;
    
    if (tripType !== 'Local Rentals') {
      message += `*Drop:* ${drop}\n`;
    }
    
    if (bookingData.stops && bookingData.stops.length > 0) {
      message += `*Stops/Sightseeing:* ${bookingData.stops.join(', ')}\n`;
    }
    
    message += `*Pickup Date:* ${date}\n`;
    
    if (tripType === 'Round Trip' && bookingData.returnDate) {
      message += `*Return Date:* ${bookingData.returnDate}\n`;
    }
    message += `*Pickup Time:* ${time}\n`;
    
    if (tripType === 'Local Rentals' && bookingData.packageType) {
      message += `*Package:* ${bookingData.packageType}\n`;
    }
    
    message += `*Vehicle:* ${cab.name} (${cab.category})\n`;
    
    const cabAddons = addons[cab.category] || {};
    let addonsTotal = 0;
    let addonTexts = [];
    if (cabAddons.luggage) { addonsTotal += 300; addonTexts.push('Luggage Carrier (₹300)'); }
    if (cabAddons.pet) { addonsTotal += 500; addonTexts.push('Pet Friendly (₹500)'); }
    if (cabAddons.expressway) { addonsTotal += 400; addonTexts.push('Expressway Toll (₹400)'); }
    
    const finalTotalFare = cab.totalFare + addonsTotal;
    message += `*Fare:* ₹${finalTotalFare.toLocaleString()}\n`;
    if (addonTexts.length > 0) {
      message += `*Selected Add-ons:* ${addonTexts.join(', ')}\n`;
    }
    message += `\n`;
    
    message += `*Included:* AC cab, driver charges, fuel for included km${cab.tripType === 'One Way' ? ', Tolls & State Taxes' : ''}\n`;
    message += `*Excluded:* ${cab.tripType !== 'One Way' ? 'toll, state tax, ' : ''}parking, waiting/night charges if applicable\n\n`;
    message += `*Customer Note:* Please confirm availability.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918595066033?text=${encodedMessage}`, '_blank');
  };

  const handleSwap = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans pb-[56px] md:pb-0">
      <Header />
      {/* Search Summary Bar & Tabs */}
      <div className="sticky top-[60px] md:top-[84px] z-40 mt-[60px] md:mt-[84px]">
        {/* Permanent Inline Edit Form (White Style) */}
        <div className="bg-gradient-to-r from-[#0a192f] via-[#112240] to-[#0a192f] border-b border-white/10 py-3">
          <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-2">
            
            {/* Trip Type Fancy Dropdown */}
            <div className="w-full lg:w-[170px] flex-shrink-0 relative">
               <div 
                 className="flex items-center justify-between bg-white rounded shadow-sm border border-gray-200 px-4 py-2.5 cursor-pointer hover:border-blue-300 transition-colors h-[46px]"
                 onClick={() => setIsTripTypeOpen(!isTripTypeOpen)}
               >
                 <span className="text-[14px] font-black text-gray-800">{editTripType}</span>
                 <ChevronDown size={16} className={`text-gray-400 transition-transform ${isTripTypeOpen ? 'rotate-180' : ''}`} />
               </div>
               {isTripTypeOpen && (
                 <>
                   <div 
                     className="fixed inset-0 z-40" 
                     onClick={() => setIsTripTypeOpen(false)}
                   ></div>
                   <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-50 overflow-hidden">
                     {Object.values(TRIP_TYPES).map(type => (
                       <div 
                         key={type}
                         className="px-4 py-2.5 text-[14px] font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors relative z-50"
                         onClick={() => {
                           setEditTripType(type);
                           setIsTripTypeOpen(false);
                         }}
                       >
                         {type}
                       </div>
                     ))}
                   </div>
                 </>
               )}
            </div>

            {/* Locations Input (using same LocationInput component from Home) */}
            <div className="w-full lg:flex-1 flex items-center gap-2 bg-white rounded shadow-sm border border-gray-200 px-2 py-1 h-[46px]">
               <div className="flex-1 h-full">
                 <LocationInput 
                   placeholder={editTripType === TRIP_TYPES.AIRPORT ? "Airport / Pickup City" : "Pickup City"}
                   value={editPickup} 
                   onChange={(e) => {
                     const val = e.target.value;
                     setEditPickup(val);
                     const lower = val.toLowerCase();
                     if (lower.includes('airport') || lower.includes('railway') || lower.includes('station') || lower.includes('junction')) {
                       setEditTripType(TRIP_TYPES.AIRPORT);
                     }
                   }}
                   isLoaded={isLoaded}
                   className="w-full h-full !pl-10 pr-2 text-[14px] font-black text-gray-800 outline-none placeholder-gray-400"
                 />
               </div>
               <div className="h-6 w-px bg-gray-200 flex-shrink-0"></div>
               <div className="flex-1 h-full">
                 {editTripType === TRIP_TYPES.LOCAL ? (
                   <select 
                     value={editLocalPackage} 
                     onChange={(e) => setEditLocalPackage(e.target.value)}
                     className="w-full h-full px-2 text-[14px] font-black text-gray-800 outline-none bg-transparent cursor-pointer appearance-none"
                   >
                     <option value="4hr/40km">4 Hrs / 40 Kms</option>
                     <option value="6hr/60km">6 Hrs / 60 Kms</option>
                     <option value="8hr/80km">8 Hrs / 80 Kms</option>
                     <option value="10hr/100km">10 Hrs / 100 Kms</option>
                     <option value="12hr/120km">12 Hrs / 120 Kms</option>
                   </select>
                 ) : (
                   <LocationInput 
                     placeholder={editTripType === TRIP_TYPES.AIRPORT ? "Drop Location" : "Drop City"}
                     value={editDrop} 
                     onChange={(e) => {
                       const val = e.target.value;
                       setEditDrop(val);
                       const lower = val.toLowerCase();
                       if (lower.includes('airport') || lower.includes('railway') || lower.includes('station') || lower.includes('junction')) {
                         setEditTripType(TRIP_TYPES.AIRPORT);
                       }
                     }}
                     isLoaded={isLoaded}
                     className="w-full h-full !pl-10 pr-2 text-[14px] font-black text-gray-800 outline-none placeholder-gray-400"
                   />
                 )}
               </div>
            </div>

            {/* Date & Time Input */}
            <div className="w-full lg:w-auto flex-shrink-0 flex items-center gap-2 bg-white rounded shadow-sm border border-gray-200 px-3 py-1 h-[46px]">
               <input 
                 type="date" 
                 className="bg-transparent text-[14px] font-black text-gray-800 outline-none border-r border-gray-200 pr-3 cursor-pointer" 
                 value={editDate}
                 onChange={(e) => setEditDate(e.target.value)} 
               />
               {editTripType === TRIP_TYPES.ROUND_TRIP && (
                 <input 
                   type="date" 
                   title="Return Date"
                   className="bg-transparent text-[14px] font-black text-gray-800 outline-none border-r border-gray-200 pr-3 pl-3 cursor-pointer" 
                   value={editReturnDate}
                   onChange={(e) => setEditReturnDate(e.target.value)} 
                 />
               )}
               <input 
                 type="time" 
                 className="bg-transparent text-[14px] font-black text-gray-800 outline-none pl-1 cursor-pointer" 
                 value={editTime}
                 onChange={(e) => setEditTime(e.target.value)} 
               />
            </div>

            {/* Search Button */}
            <button 
              onClick={handleUpdateSearch}
              disabled={isCalculating}
              className="w-full lg:w-[140px] flex-shrink-0 text-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 lg:py-0 lg:h-[46px] flex items-center justify-center rounded font-black text-[14px] uppercase tracking-wide transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isCalculating ? <Loader2 size={18} className="animate-spin" /> : "SEARCH"}
            </button>
            
          </div>
        </div>

        {/* Cab Type Tabs Ribbon */}
        <div className="bg-white shadow-[0_4px_10px_-4px_rgba(0,0,0,0.1)] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center overflow-x-auto hide-scrollbar gap-2 md:gap-4">
              {categoryPrices.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center min-w-[100px] md:min-w-[130px] px-2 py-3 md:py-4 border-b-[3px] transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-blue-500'
                  }`}
                >
                  <span className={`text-[13px] md:text-[15px] ${activeTab === tab.id ? 'font-black' : 'font-bold'}`}>{tab.label}</span>
                  <span className={`text-[11px] md:text-[12px] mt-0.5 ${activeTab === tab.id ? 'text-blue-600 font-bold' : 'text-gray-400 font-medium'}`}>
                    {tab.id === 'All' ? `Starts at ₹${tab.price}` : `₹${tab.price} onwards`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 mt-4 md:mt-6 w-full flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filter Button */}
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full bg-white border border-slate-200 p-3 rounded-xl font-bold flex justify-center items-center gap-2 text-primary shadow-sm"
        >
          <Filter size={18} /> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Left Sidebar - Filters */}
        <div className={`lg:w-[280px] flex-shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-[170px]">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
              <h3 className="font-black text-gray-900 text-[18px]">Filters</h3>
              <button onClick={clearFilters} className="text-[12px] text-blue-600 font-black hover:underline uppercase">Clear All</button>
            </div>
            
            <div className="mb-6">
              <h4 className="font-black text-gray-800 mb-3 text-[14px]">CAB TYPE</h4>
              <div className="space-y-3 mt-4 text-[13px] text-gray-600 font-medium">
                {['Hatchback', 'Sedan', 'MUV', 'SUV', 'Minibus'].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); handleFilterChange(setCabTypes, cabTypes, type); }}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${cabTypes.includes(type) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                      {cabTypes.includes(type) && <Check size={14} className="text-white" />}
                    </div>
                    <span className="group-hover:text-gray-900">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-black text-gray-800 mb-3 text-[14px]">FUEL TYPE</h4>
              <div className="space-y-3 mt-4 text-[13px] text-gray-600 font-medium">
                {['Diesel', 'Petrol', 'CNG'].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); handleFilterChange(setFuelTypes, fuelTypes, type); }}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${fuelTypes.includes(type) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                      {fuelTypes.includes(type) && <Check size={14} className="text-white" />}
                    </div>
                    <span className="group-hover:text-gray-900">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black text-gray-800 mb-3 text-[14px]">CAB MODEL</h4>
              <div className="space-y-3 mt-4 text-[13px] text-gray-600 font-medium">
                {['WagonR', 'Dzire', 'Ertiga', 'Innova', 'Tempo'].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); handleFilterChange(setCabModels, cabModels, type); }}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${cabModels.includes(type) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                      {cabModels.includes(type) && <Check size={14} className="text-white" />}
                    </div>
                    <span className="group-hover:text-gray-900">{type.replace('Tempo', 'Tempo Traveller')}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Fare Cards */}
        <div className="lg:w-3/4 space-y-4 relative">
          <h2 className="text-xl font-bold text-primary mb-2">Available Cabs ({filteredVehicles.length})</h2>

          {/* Guaranteed On-Time Cabs Banner */}
          <div ref={trustInfoRef} className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 flex items-center justify-between shadow-sm relative z-40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-black text-green-900 text-[15px] leading-tight">Guaranteed on-time cabs!</h4>
                <p className="text-green-800 text-[13px] font-medium mt-0.5">Travel with our handpicked suppliers, carefully selected for your comfort</p>
              </div>
            </div>
            <button 
              className="p-2 text-green-700 hover:text-green-900 hover:bg-green-100 rounded-full transition-colors relative"
              onClick={() => setShowTrustInfo(!showTrustInfo)}
              title="How Do We Ensure This?"
            >
              <Info className="w-5 h-5" />
            </button>
            
            {showTrustInfo && (
              <div className="absolute top-[110%] right-0 w-[320px] bg-white border border-slate-200 shadow-xl rounded-xl z-50 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-black text-gray-900">How Do We Ensure This?</h5>
                  <button onClick={() => setShowTrustInfo(false)} className="text-gray-400 hover:text-gray-600">×</button>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h6 className="font-bold text-gray-800 text-[13px]">Trusted Drivers</h6>
                      <p className="text-gray-500 text-[12px] leading-snug">Verified and experienced drivers with local know how</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h6 className="font-bold text-gray-800 text-[13px]">Clean and Quality cabs</h6>
                      <p className="text-gray-500 text-[12px] leading-snug">Hygienic & sanitized rides from our trusted operators</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h6 className="font-bold text-gray-800 text-[13px]">On-Time Pickup</h6>
                      <p className="text-gray-500 text-[12px] leading-snug">Real time monitoring of cab allocated through command centre</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowTrustInfo(false)} 
                  className="mt-5 w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-2.5 rounded-lg text-[13px] uppercase tracking-wide transition-colors"
                >
                  Ok, Got It!
                </button>
              </div>
            )}
          </div>
          
          {/* Distance and Time Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[14px] text-gray-700 font-black mb-4 flex items-center justify-between">
            <span>Rates for {calculatedDistance} Kms approx distance | {routeResult?.travelTime || "4.5 hr(s)"} approx time</span>
          </div>

          {filteredVehicles.length === 0 && (
            <div className="bg-white p-8 rounded-2xl text-center border border-slate-100">
              <p className="text-slate-500 font-bold">No vehicles match selected filters.</p>
              <button onClick={clearFilters} className="mt-4 text-accent font-bold hover:underline">Clear Filters</button>
            </div>
          )}

          {filteredVehicles.map((cab, idx) => {
            const isExpanded = expandedCard === cab.category;
            const carImg = VEHICLE_IMAGES[cab.category] || sedanImg;

            return (
              <React.Fragment key={idx}>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
                  <div 
                    className="p-5 flex flex-col md:flex-row gap-6 cursor-pointer"
                    onClick={() => setExpandedCard(isExpanded ? null : cab.category)}
                  >
                  {/* Image */}
                  <div className="md:w-[20%] flex-shrink-0 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-5">
                    <div className="w-full h-36 md:h-40 flex items-center justify-center relative">
                      <img 
                        src={carImg} 
                        alt={cab.category} 
                        className="w-full h-full object-contain transform scale-110 md:scale-125 drop-shadow-md transition-transform"
                      />
                    </div>
                  </div>

                  {/* Details (Middle) */}
                  <div className="flex-1 flex flex-col justify-between py-1 md:px-2">
                    <div className="flex flex-col mb-5">
                      
                      {/* Car Name + "or similar" on one line */}
                      <h3 className="text-[18px] md:text-[20px] font-black text-gray-900 leading-tight flex items-baseline flex-wrap gap-2">
                        {cab.description && cab.description.replace(' or similar', '') || cab.name || cab.category}
                        <span className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">or similar</span>
                      </h3>
                      
                      {/* Specs in one line below the car */}
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        {/* Car Details: Hatchback • AC • 4 Seats • Compact Car */}
                        <div className="flex items-center flex-wrap gap-2 text-[13px] text-gray-700 font-bold">
                          <span className="text-gray-900">{cab.category}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                          <span>{cab.ac !== false ? 'AC' : 'Non-AC'}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                          <span>{cab.seats} Seats</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                          <span className="text-gray-500">
                            {cab.category === 'Hatchback' ? 'Compact Car' : cab.category === 'Sedan' ? 'Prime Sedan' : cab.category === 'SUV' || cab.category.includes('Innova') ? 'Spacious SUV' : 'Minibus'}
                          </span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 text-[12px] text-gray-500 font-bold mt-1">
                          <span className="text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">{cab.originalDistanceKm || calculatedDistance} kms included</span>
                          <span>|</span>
                          <span>Est. {routeResult?.travelTime || "4.5 hr(s)"}</span>
                        </div>
                      </div>
                    </div>

                    {/* MMT Style Feature Strip - With Dividers */}
                    <div className="grid grid-cols-2 md:grid-cols-4 bg-[#f8fafc] rounded-xl border border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
                      <div className="p-3">
                        <span className="text-[10px] uppercase font-black text-slate-500 block mb-1 tracking-wider">Extra km fare</span>
                        <span className="text-[12px] font-bold text-slate-800 leading-snug block">₹{cab.perKmRate}/km after {cab.originalDistanceKm || calculatedDistance} kms</span>
                      </div>
                      <div className="p-3">
                        <span className="text-[10px] uppercase font-black text-slate-500 block mb-1 tracking-wider">Fuel Type</span>
                        <span className="text-[12px] font-bold text-slate-800 leading-snug block">
                          {cab.fuelType === 'CNG' ? 'CNG with refill breaks' : cab.fuelType || 'Diesel'}
                        </span>
                      </div>
                      <div className="p-3">
                        <span className="text-[10px] uppercase font-black text-slate-500 block mb-1 tracking-wider">Cancellation</span>
                        <span className="text-[12px] font-bold text-slate-800 leading-snug block">Free</span>
                        <span className="text-[10px] text-slate-500 font-bold mt-0.5 block">till 1 hour of departure</span>
                      </div>
                      <div className="p-3">
                        <span className="text-[10px] uppercase font-black text-slate-500 block mb-1 tracking-wider">Amenities</span>
                        <span className="text-[12px] font-bold text-slate-800 leading-snug block">Driver in uniform & route expert, Sanitiser</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action (Right) */}
                  <div className="md:w-[26%] flex-shrink-0 flex flex-col items-center md:items-end justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-5">
                    
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[#2196F3] text-[12px] font-black uppercase">15% off</span>
                      {cab.marketFare > 0 && (
                        <span className="text-[14px] text-gray-400 line-through font-bold">₹ {cab.marketFare.toLocaleString()}</span>
                      )}
                    </div>
                    
                    {/* Big Bold Base Amount (Total - Taxes) */}
                    <span className="font-black text-[26px] text-gray-900 leading-none tracking-tight mt-1">
                      ₹ {(cab.totalFare - cab.taxesAndChargesTotal + (addons[cab.category]?.luggage ? 300 : 0) + (addons[cab.category]?.pet ? 500 : 0) + (addons[cab.category]?.expressway ? 400 : 0)).toLocaleString()}
                    </span>
                    
                    {/* Taxes & Charges Text */}
                    {cab.taxesAndChargesTotal > 0 && (
                      <span className="text-[12px] text-gray-600 font-medium mt-1.5 mb-3">
                        + ₹{cab.taxesAndChargesTotal.toLocaleString()} (Taxes & Charges)
                      </span>
                    )}

                    <button 
                      className={`w-full text-[14px] font-black px-4 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1 ${isExpanded ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'}`}
                    >
                      {isExpanded ? 'Hide Details' : 'VIEW DETAILS'}
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expandable Content */}
                {isExpanded && (
                  <div className="px-5 md:px-8 pb-8 pt-6 border-t border-gray-100 bg-slate-50/50">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Left Details Grid (Fare Breakup + Includes/Excludes) */}
                      <div className="flex-1 space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Fare Breakup Box */}
                          <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="font-black text-gray-900 text-[15px] flex items-center border-b border-slate-100 pb-3 mb-4">
                              <CreditCard className="w-4 h-4 mr-2 text-blue-600" /> Fare Breakup
                            </h4>
                            
                            <div className="flex justify-between text-[13px] font-medium text-gray-600">
                              <span>Base Fare</span>
                              <span className="font-bold text-gray-900">₹{cab.distanceCharge || cab.baseFare}</span>
                            </div>

                            {cab.driverAllowance > 0 && (
                              <div className="flex justify-between text-[13px] font-medium text-gray-600">
                                <span>Driver Allowance</span>
                                <span className="font-bold text-gray-900">₹{cab.driverAllowance}</span>
                              </div>
                            )}

                            {cab.tripType === 'One Way' && (cab.estimatedToll > 0 || cab.estimatedStateTax > 0) && (
                              <div className="flex justify-between text-[13px] font-medium text-gray-600">
                                <span>Toll & State Tax</span>
                                <span className="font-bold text-gray-900">
                                  ₹{(typeof cab.estimatedToll === 'number' ? cab.estimatedToll : 0) + (typeof cab.estimatedStateTax === 'number' ? cab.estimatedStateTax : 0)}
                                </span>
                              </div>
                            )}

                            {cab.gstAmount > 0 && (
                              <div className="flex justify-between text-[13px] font-medium text-gray-600">
                                <span>GST (5%)</span>
                                <span className="font-bold text-gray-900">₹{cab.gstAmount}</span>
                              </div>
                            )}

                            {/* Add-ons injected here */}
                            {addons[cab.category]?.luggage && (
                              <div className="flex justify-between text-[13px] font-medium text-gray-600">
                                <span>Luggage Carrier</span>
                                <span className="font-bold text-gray-900">₹300</span>
                              </div>
                            )}
                            {addons[cab.category]?.pet && (
                              <div className="flex justify-between text-[13px] font-medium text-gray-600">
                                <span>Pet Friendly Service</span>
                                <span className="font-bold text-gray-900">₹500</span>
                              </div>
                            )}
                            {addons[cab.category]?.expressway && (
                              <div className="flex justify-between text-[13px] font-medium text-gray-600">
                                <span>Expressway Toll</span>
                                <span className="font-bold text-gray-900">₹400</span>
                              </div>
                            )}
                            
                            {cab.tripType === 'Local Rental' && (
                              <>
                                <div className="flex justify-between items-center text-gray-700">
                                  <span className="font-medium">Package Details</span>
                                  <span className="font-bold">{localPackage || '8hr/80km'}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                  <span className="font-medium">Extra Hour</span>
                                  <span className="font-bold">₹{cab.category.includes('Swift') || cab.category.includes('Hatchback') ? '100' : '150'}/hr</span>
                                </div>
                              </>
                            )}

                            <div className="flex justify-between items-center pt-4 border-t border-dashed border-slate-200 mt-4">
                              <span className="font-black text-gray-900 text-[16px]">Total Amount</span>
                              <span className="font-black text-[22px] text-gray-900">
                                ₹{(cab.totalFare + (addons[cab.category]?.luggage ? 300 : 0) + (addons[cab.category]?.pet ? 500 : 0) + (addons[cab.category]?.expressway ? 400 : 0)).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {/* Add-ons Box */}
                          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-[13px] flex flex-col justify-between">
                            <div>
                              <h4 className="font-black text-gray-900 text-[15px] mb-4">Add-on Services</h4>
                              <div className="space-y-3 text-gray-700 font-medium">
                                <label className="flex items-center justify-between cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                                      checked={!!addons[cab.category]?.luggage} 
                                      onChange={(e) => handleAddonChange(cab.category, 'luggage', e.target.checked)} 
                                    />
                                    <span>Extra Luggage Carrier</span>
                                  </div>
                                  <span className="font-bold">₹300</span>
                                </label>
                                <label className="flex items-center justify-between cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                                      checked={!!addons[cab.category]?.pet} 
                                      onChange={(e) => handleAddonChange(cab.category, 'pet', e.target.checked)} 
                                    />
                                    <span>Pet Friendly Journey</span>
                                  </div>
                                  <span className="font-bold">₹500</span>
                                </label>
                                <label className="flex items-center justify-between cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                                      checked={!!addons[cab.category]?.expressway} 
                                      onChange={(e) => handleAddonChange(cab.category, 'expressway', e.target.checked)} 
                                    />
                                    <span>Use Expressway / New Highway</span>
                                  </div>
                                  <span className="font-bold">₹400</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Included / Excluded Section */}
                        <div className="bg-[#fff9f9] rounded-xl border border-red-100 shadow-sm overflow-hidden text-[13px]">
                          <div className="bg-slate-50 border-b border-slate-200 p-3 flex gap-8 font-black">
                            <span className="text-gray-900 w-1/2">Included in fare</span>
                            <span className="text-gray-900 w-1/2">Extra Charges</span>
                          </div>
                          <div className="flex flex-col md:flex-row">
                            {/* Inclusions */}
                            <div className="w-full md:w-1/2 p-4 space-y-2 border-b md:border-b-0 md:border-r border-slate-200 bg-white">
                              <div className="flex items-center gap-2 text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" /> <span className="font-medium">Base Fare & Driver Allowance</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" /> <span className="font-medium">GST (5%)</span>
                              </div>
                              {cab.tripType === 'One Way' && (
                                <div className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" /> <span className="font-medium">Tolls & State Taxes</span>
                                </div>
                              )}
                              {cab.tripType === 'Local Rental' ? (
                                <div className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" /> <span className="font-medium">Included: {cab.chargeableKm} km limits</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" /> <span className="font-medium">One Pickup & Drop</span>
                                </div>
                              )}
                            </div>

                            {/* Exclusions */}
                            <div className="w-full md:w-1/2 p-4 space-y-2 bg-[#fcf8f8]">
                              {cab.tripType !== 'One Way' && (
                                <div className="flex items-center gap-2 text-gray-600">
                                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> <span className="font-medium">Tolls & State Taxes (Approx ₹{cab.estimatedToll || 0})</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-gray-600">
                                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> <span className="font-medium">Parking Charges</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> <span className="font-medium">Waiting Charges</span>
                              </div>
                              {isHillRoute && (
                                <div className="flex items-center gap-2 text-gray-600">
                                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> <span className="font-medium">Hill / Green Tax / Permit Charges</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-gray-600">
                                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> <span className="font-medium">Night Charges (10 PM to 6 AM)</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> <span className="font-medium">Extra KM (₹{cab.perKmRate}/km)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* T&C Box */}
                        <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 text-[12px] text-gray-600">
                          <h4 className="font-bold text-gray-800 mb-2">Read before you book</h4>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Your trip is estimated for {cab.originalDistanceKm || calculatedDistance} kms. Extra usage will be charged as per actuals.</li>
                            {isHillRoute && <li>A/C will be turned off in hilly areas.</li>}
                            <li>Luggage must be accommodated within the boot space; carriers are not guaranteed.</li>
                          </ul>
                        </div>
                      </div>

                      {/* Right Details Grid (Booking Actions) */}
                      <div className="w-full lg:w-[320px] flex-shrink-0 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit sticky top-[150px]">
                        <h4 className="font-black text-gray-900 text-[18px] mb-2 text-center">Confirm Booking</h4>
                        <p className="text-[13px] text-gray-500 mb-6 text-center leading-relaxed font-medium">
                          No advance payment needed right now. Send details to WhatsApp to confirm.
                        </p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleBookNow(cab); }}
                          className="bg-[#25D366] hover:bg-[#1ebd5a] text-white font-black py-4 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 w-full text-[15px]"
                        >
                          <MessageCircle className="w-5 h-5" /> CONFIRM ON WHATSAPP
                        </button>
                        
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleBookNow(cab); }}
                          className="mt-3 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-gray-700 font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 w-full text-[14px]"
                        >
                          <Search className="w-4 h-4" /> SEND ENQUIRY
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Promotional Banner injected after the first item */}
              {idx === 0 && (
                <div className="bg-[#f0f5ff] border border-blue-100/50 rounded-2xl p-5 md:p-6 mt-6 mb-6 shadow-sm">
                  <h3 className="text-[18px] font-black text-gray-900 mb-5 md:mb-6">Why book with us ?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Highlight 1 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-[14px] text-gray-900 mb-1.5 leading-tight">Highly Rated Drivers</h4>
                        <p className="text-[12px] text-gray-600 font-medium leading-snug">Experienced and polite drivers who will stay with you throughout your trip with well-serviced and comfortable cars.</p>
                      </div>
                    </div>
                    
                    {/* Highlight 2 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                          <Navigation className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-[14px] text-gray-900 mb-1.5 leading-tight">One Way fares</h4>
                        <p className="text-[12px] text-gray-600 font-medium leading-snug">Special one-way fares to just get dropped off to your destination.</p>
                      </div>
                    </div>

                    {/* Highlight 3 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-[14px] text-gray-900 mb-1.5 leading-tight">Sanitised Cabs for Safer travel</h4>
                        <p className="text-[12px] text-gray-600 font-medium leading-snug">Travel worry-free with drivers trained to follow all necessary safety precautions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
        </div>
      </main>
    </div>
  );
}
