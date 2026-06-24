import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Calendar, Clock, ArrowRight, Loader2, Zap, X, RefreshCw, Car, Plane } from 'lucide-react';
import { useJsApiLoader } from '@react-google-maps/api';
import ReactGA from 'react-ga4';

import { getRouteDistance } from '../lib/mapsApi';
import { getAllVehicleFares } from '../lib/pricingEngine';
import { TRIP_TYPES } from '../lib/pricingRules';
import FareBreakup from './FareBreakup';
import LocationInput from './LocationInput';
import { getCurrentLocationConfig } from '../lib/location';
import { routes } from '../data/routes';

const libraries = ['places'];

export default function BookingCard() {
  const navigate = useNavigate();
  const currentLocation = getCurrentLocationConfig();
  
  const [pickup, setPickup] = useState(currentLocation?.city || '');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Trip State
  const [tripType, setTripType] = useState(TRIP_TYPES.ONE_WAY);
  const [returnDate, setReturnDate] = useState('');
  const [localPackage, setLocalPackage] = useState('8hr/80km');
  const [stops, setStops] = useState([]);

  const [prevPickupDate, setPrevPickupDate] = useState(date);

  useEffect(() => {
    if (date !== prevPickupDate) {
      if (returnDate && returnDate < date) {
        setReturnDate('');
      }
      setPrevPickupDate(date);
    }
  }, [date, returnDate, prevPickupDate]);
  
  const [isCalculating, setIsCalculating] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const hasMapsKey = !!(apiKey && apiKey.trim() !== "");

  const { isLoaded: mapsScriptLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: libraries
  });

  const isLoaded = hasMapsKey && mapsScriptLoaded;

  const swapLocations = () => {
    const temp = pickup;
    setPickup(drop);
    setDrop(temp);
  };

  const handleCalculateFare = async (e) => {
    e.preventDefault();
    if (!pickup || !date || !time) {
      alert("Please fill all required fields");
      return;
    }
    if (tripType !== TRIP_TYPES.LOCAL && !drop) {
      alert("Please fill drop location");
      return;
    }
    if (tripType === TRIP_TYPES.ROUND_TRIP) {
      if (!returnDate) {
        alert("Please select a return date");
        return;
      }
      if (returnDate < date) {
        alert("Return date cannot be before pickup date.");
        return;
      }
    }
    
    setIsCalculating(true);

    try {
      ReactGA.event("fare_search", {
        category: "Engagement",
        label: `${tripType}: ${pickup} to ${drop || localPackage}`
      });

      // SEO Route Redirect Logic
      if (tripType === TRIP_TYPES.ONE_WAY && pickup && drop) {
        const pLower = pickup.toLowerCase();
        const dLower = drop.toLowerCase();
        
        const matchedRoute = routes.find(r => {
          const rFrom = (r.fromCity || r.from || '').toLowerCase();
          const rTo = (r.toCity || r.to || '').toLowerCase();
          
          if (!rFrom || !rTo) return false;
          
          let pMatch = pLower.includes(rFrom) || (rFrom === 'delhi' && pLower.includes('new delhi'));
          let dMatch = dLower.includes(rTo) || (rTo === 'delhi' && dLower.includes('new delhi'));
          
          if (!pMatch && r.fromAliases) {
            pMatch = r.fromAliases.some(alias => pLower.includes(alias.toLowerCase()));
          }
          if (!dMatch && r.toAliases) {
            dMatch = r.toAliases.some(alias => dLower.includes(alias.toLowerCase()));
          }
          
          return pMatch && dMatch;
        });

        if (matchedRoute && matchedRoute.slug) {
          navigate(`/${matchedRoute.slug}`);
          return;
        }
      }

      const routeResult = tripType === TRIP_TYPES.LOCAL ? 
                        { distanceKm: 0, tollsAndTaxes: 0, source: 'local', distanceSource: 'local', isUnknownRoute: false } : 
                        await getRouteDistance(pickup, drop);
      
      if (!routeResult || routeResult.distanceKm === null || routeResult.distanceKm === undefined) {
        throw new Error("Unable to calculate route distance. Please check pickup/drop address.");
      }

      const fares = getAllVehicleFares({
        tripType,
        distanceKm: routeResult.distanceKm,
        estimatedToll: routeResult.estimatedToll,
        estimatedStateTax: routeResult.estimatedStateTax,
        tollCount: routeResult.tollCount,
        travelTime: routeResult.travelTime,
        routeSource: routeResult.source,
        distanceSource: routeResult.distanceSource,
        isUnknownRoute: routeResult.isUnknownRoute,
        pickupDate: date,
        returnDate: returnDate,
        localPackage: localPackage,
        pickupTime: time
      });

      if (fares.length === 0) throw new Error("Could not calculate fares");

      // Navigate to fare-results with the calculated data
      navigate('/fare-results', {
        state: {
          bookingData: { tripType, pickup, drop, date, time, returnDate, packageType: localPackage, stops },
          calculatedDistance: routeResult.distanceKm,
          calculatedFares: fares,
          routeResult: routeResult
        }
      });

    } catch (err) {
      console.error("Error calculating fare:", err);
      alert(err.message || "Unable to calculate route distance. Please check pickup/drop address.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <>
      <div className="w-full md:w-[610px] max-w-full shrink-0 bg-white rounded-[24px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100 flex flex-col h-full mt-4 md:mt-0 booking-container-mobile-offset relative z-40">
        
        <div className="bg-[#3b2b98] px-6 py-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-[30px] sm:text-[34px] font-black text-white mb-1.5 tracking-wide">Book Your Ride</h2>
            <p className="text-blue-100 text-[14px] sm:text-[16px] font-bold">Get Instant Price & Book Your Taxi</p>
          </div>
        </div>
        
        <form className="p-5 sm:p-7.5 space-y-5 flex-grow" onSubmit={handleCalculateFare}>
          
          {/* Trip Type Toggles */}
          <div className="flex mb-5 flex-wrap sm:flex-nowrap gap-1">
            {Object.values(TRIP_TYPES).map((type) => {
              let displayLabel = type;
              let icon = null;
              if (type === 'One Way') {
                displayLabel = 'Outstation One Way';
                icon = <ArrowRight size={14} className="inline-block mr-1 mb-[1px]" />;
              } else if (type === 'Round Trip') {
                displayLabel = 'Outstation Round Trip';
                icon = <RefreshCw size={14} className="inline-block mr-1 mb-[1px]" />;
              } else if (type === 'Local Rental') {
                displayLabel = 'Local Rental';
                icon = <Car size={14} className="inline-block mr-1 mb-[1px]" />;
              } else if (type === 'Airport Transfer') {
                displayLabel = 'Airport Transfer';
                icon = <Plane size={14} className="inline-block mr-1 mb-[1px]" />;
              }

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTripType(type)}
                  className={`flex-1 min-w-[45%] sm:min-w-0 flex items-center justify-center text-center leading-tight text-[10px] sm:text-[11px] font-bold py-2 px-1 rounded-md transition-all m-[1px] ${
                    tripType === type 
                      ? 'bg-[#00914d] text-white shadow-sm' 
                      : 'trip-card--inactive text-slate-500 hover:bg-slate-200 hover:text-[#0f172a]'
                  }`}
                >
                  {icon}<span className="inline-block">{displayLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Locations */}
          {tripType === TRIP_TYPES.LOCAL ? (
            <LocationInput
              label="Pickup City"
              placeholder="Enter pickup city"
              value={pickup}
              onChange={(e) => {
                const val = e.target.value;
                setPickup(val);
                const lower = val.toLowerCase();
                if (lower.includes('airport') || lower.includes('railway') || lower.includes('station') || lower.includes('junction')) {
                  setTripType(TRIP_TYPES.AIRPORT);
                }
              }}
              iconColor="text-[#00914d]"
              isLoaded={isLoaded}
            />
          ) : (
            <div className="relative space-y-3">
              <LocationInput
                label={tripType === TRIP_TYPES.AIRPORT ? "Airport / Pickup" : "Pickup City"}
                placeholder={tripType === TRIP_TYPES.AIRPORT ? "Enter airport or city" : "Enter pickup city"}
                value={pickup}
                onChange={(e) => {
                  const val = e.target.value;
                  setPickup(val);
                  const lower = val.toLowerCase();
                  if (lower.includes('airport') || lower.includes('railway') || lower.includes('station') || lower.includes('junction')) {
                    setTripType(TRIP_TYPES.AIRPORT);
                  }
                }}
                iconColor="text-[#00914d]"
                isLoaded={isLoaded}
              />

              {/* Add Stops — between pickup and drop */}
              {(tripType === TRIP_TYPES.ONE_WAY || tripType === TRIP_TYPES.ROUND_TRIP) && (
                <div>
                  {stops.map((stop, idx) => (
                    <div key={idx} className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        placeholder={`Stop ${idx + 1}`}
                        value={stop}
                        onChange={(e) => {
                          const newStops = [...stops];
                          newStops[idx] = e.target.value;
                          setStops(newStops);
                        }}
                        className="flex-1 pl-3 pr-2 py-2 border border-gray-200 rounded-lg text-[14px] text-gray-700 focus:border-[#3b2b98]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newStops = stops.filter((_, i) => i !== idx);
                          setStops(newStops);
                        }}
                        className="text-red-400 hover:text-red-600 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setStops([...stops, ''])}
                    className="mt-2 flex items-center gap-1 text-[12px] font-bold text-[#3b2b98] hover:text-[#2a1f72] py-1"
                  >
                    + Add Stop
                  </button>
                </div>
              )}
              
              <LocationInput
                label={tripType === TRIP_TYPES.AIRPORT ? "Drop City / Airport" : "Drop City"}
                placeholder={tripType === TRIP_TYPES.AIRPORT ? "Enter city or airport" : "Enter drop city"}
                value={drop}
                onChange={(e) => {
                  const val = e.target.value;
                  setDrop(val);
                  const lower = val.toLowerCase();
                  if (lower.includes('airport') || lower.includes('railway') || lower.includes('station') || lower.includes('junction')) {
                    setTripType(TRIP_TYPES.AIRPORT);
                  }
                }}
                iconColor="text-red-500"
                isLoaded={isLoaded}
              />
              
              {/* Swap Button on the Right */}
              <div className="absolute right-3.5 top-[86px] -translate-y-1/2 z-20 pointer-events-auto">
                <button 
                  type="button" 
                  onClick={swapLocations}
                  className="bg-white border-2 border-blue-100 hover:border-[#3b2b98] shadow-md rounded-full p-1.5 hover:bg-gray-50 transition-all flex items-center justify-center cursor-pointer active:scale-95"
                >
                  <ArrowLeftRight className="w-[14px] h-[14px] text-[#3b2b98] rotate-90" />
                </button>
              </div>
            </div>
          )}

          {/* Local Packages (If Local) */}
          {tripType === TRIP_TYPES.LOCAL && (
            <div>
              <label className="block text-[12px] font-bold text-gray-800 mb-2 ml-1">Select Package</label>
              <div className="flex gap-1.5">
                {[
                  { value: '4hr/40km',   hrs: '4 Hrs',  km: '40km' },
                  { value: '6hr/60km',   hrs: '6 Hrs',  km: '60km' },
                  { value: '8hr/80km',   hrs: '8 Hrs',  km: '80km' },
                  { value: '10hr/100km', hrs: '10 Hrs', km: '100km' },
                  { value: '12hr/120km', hrs: '12 Hrs', km: '120km' },
                ].map((pkg) => (
                  <button
                    key={pkg.value}
                    type="button"
                    onClick={() => setLocalPackage(pkg.value)}
                    className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg border-2 transition-all ${
                      localPackage === pkg.value
                        ? 'border-[#3b2b98] bg-[#3b2b98]/5 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-[#3b2b98]/40'
                    }`}
                  >
                    <span className={`text-[11px] font-black leading-tight ${
                      localPackage === pkg.value ? 'text-[#3b2b98]' : 'text-[#0f172a]'
                    }`}>{pkg.hrs}</span>
                    <span className={`text-[10px] font-semibold ${
                      localPackage === pkg.value ? 'text-[#00914d]' : 'text-slate-400'
                    }`}>{pkg.km}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

            {/* Date & Time */}
            <div>
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5 ml-1">Pickup Date & Time</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative cursor-pointer" onClick={(e) => { const inp = e.currentTarget.querySelector('input'); inp?.showPicker?.(); inp?.focus(); }}>
                  <Calendar className="absolute left-3.5 top-[14px] w-[18px] h-[18px] text-gray-400 pointer-events-none" />
                  {!date && <span className="absolute left-10 top-1/2 -translate-y-1/2 text-[13px] text-gray-400 pointer-events-none select-none">Journey Date</span>}
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ color: date ? undefined : 'transparent' }}
                    className="w-full pl-10 pr-2 py-3 border border-gray-200 rounded-lg text-[14px] sm:text-[13px] text-gray-700 outline-none focus:border-[#3b2b98] bg-white min-h-[46px] appearance-none cursor-pointer"
                    required
                  />
                </div>
                <div className="relative cursor-pointer" onClick={(e) => { const inp = e.currentTarget.querySelector('input'); inp?.showPicker?.(); inp?.focus(); }}>
                  <Clock className="absolute left-3.5 top-[14px] w-[18px] h-[18px] text-gray-400 pointer-events-none" />
                  {!time && <span className="absolute left-10 top-1/2 -translate-y-1/2 text-[13px] text-gray-400 pointer-events-none select-none">Pickup Time</span>}
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    style={{ color: time ? undefined : 'transparent' }}
                    className="w-full pl-10 pr-2 py-3 border border-gray-200 rounded-lg text-[14px] sm:text-[13px] text-gray-700 outline-none focus:border-[#3b2b98] bg-white min-h-[46px] appearance-none cursor-pointer"
                    required
                  />
                </div>
              </div>
            </div>
            {/* Add Stops section moved to between pickup and drop — rendered there */}

          {/* Return Date (If Round Trip) */}
          {tripType === TRIP_TYPES.ROUND_TRIP && (
            <div>
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5 ml-1">Return Date</label>
              <div
                className="relative cursor-pointer"
                onClick={(e) => { const inp = e.currentTarget.querySelector('input'); inp?.showPicker?.(); inp?.focus(); }}
              >
                <Calendar className="absolute left-3.5 top-[14px] w-[18px] h-[18px] text-gray-400 pointer-events-none" />
                {!returnDate && <span className="absolute left-10 top-1/2 -translate-y-1/2 text-[13px] text-gray-400 pointer-events-none select-none">Return Date</span>}
                <input
                  type="date"
                  min={date}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  style={{ color: returnDate ? undefined : 'transparent' }}
                  className="w-full pl-10 pr-2 py-3 border border-gray-200 rounded-lg text-[14px] sm:text-[13px] text-gray-700 outline-none focus:border-[#3b2b98] bg-white min-h-[46px] appearance-none cursor-pointer"
                  required
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isCalculating}
            className="w-full bg-[#00914d] hover:bg-green-700 text-white font-bold py-3.5 rounded-[10px] flex items-center justify-center transition-colors mt-6 text-[15px] shadow-md shadow-[#00914d]/20 disabled:bg-gray-400"
          >
            {isCalculating ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Checking Fare...</>
            ) : (
              <>Check Fare <ArrowRight className="w-5 h-5 ml-2" /></>
            )}
          </button>
          <div className="text-center pt-2">
            <p className="text-[12px] font-bold text-gray-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-yellow-500 mr-1 fill-yellow-500" /> Instant WhatsApp Confirmation
            </p>
          </div>
        </form>
      </div>

      {/* Fare calculation now navigates to /fare-results */}
    </>
  );
}
