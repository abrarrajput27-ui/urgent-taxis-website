import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, MapPin, 
  CreditCard, Loader2, Navigation, AlertCircle, Phone, Mail, User, Briefcase, ArrowRight, Calendar
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReactGA from 'react-ga4';
import { getCurrentLocationConfig } from '../lib/location';

import hatchbackImg from '../assets/images/Hatchback.png';
import sedanImg from '../assets/images/Sedan.png';
import ertigaImg from '../assets/images/Ertiga.png';
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
  "Innova": innovaImg,
  "Innova Crysta": premiumSuvImg,
  "Traveller 12": travellerImg,
  "Traveller 16": travellerImg,
  "Traveller 20": travellerImg,
  "Traveller 26": travellerImg,
  "Urbania 12": urbaniaImg,
  "Urbania 16": urbania16Img,
  "Bus 27": busImg,
  "Bus 45": busImg
};

const VEHICLE_INFO = {
  "Hatchback": { seats: "4 Seats", luggage: "2 Small Bags" },
  "Sedan": { seats: "4 Seats", luggage: "3 Bags" },
  "Ertiga": { seats: "6+1 Seats", luggage: "4 Bags" },
  "Innova": { seats: "6+1 Seats", luggage: "4 Bags" },
  "Innova Crysta": { seats: "6+1 Seats", luggage: "5 Bags" }
};

const getVehicleSeatsAndLuggage = (category, defaultSeats) => {
  if (VEHICLE_INFO[category]) return VEHICLE_INFO[category];
  return { seats: `${defaultSeats} Seats`, luggage: "Ample Luggage" };
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationData = getCurrentLocationConfig();

  const { bookingData, selectedFare, distanceKm } = location.state || {};

  // Redirect if accessed directly without data
  useEffect(() => {
    if (!bookingData || !selectedFare) {
      navigate('/');
    }
  }, [bookingData, selectedFare, navigate]);

  if (!bookingData || !selectedFare) return null;

  const tripType = bookingData.tripType || 'One Way';
  const pickup = bookingData.pickup || '';
  const drop = bookingData.drop || '';
  const date = bookingData.date || '';
  const time = bookingData.time || '';
  const returnDate = bookingData.returnDate || '';
  const localPackage = bookingData.packageType || '8hr/80km';

  const tripTimeDiff = returnDate ? Math.abs(new Date(returnDate).getTime() - new Date(date).getTime()) : 0;
  const tripDays = returnDate ? Math.max(1, Math.ceil(tripTimeDiff/86400000) + 1) : 1;

  // Form State
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [passengers, setPassengers] = useState('1 Passenger');
  const [luggage, setLuggage] = useState('No Luggage');
  const [pickupLandmark, setPickupLandmark] = useState('');
  const [dropLandmark, setDropLandmark] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Addons State
  const [selectedAddons, setSelectedAddons] = useState([]);
  
  const addonsList = [
    { id: 'expressway', title: 'Take Expressway / Premium Route', price: 199, popular: true },
    { id: 'carrier', title: 'Cab with Luggage Carrier', price: 149 },
    { id: 'newcar', title: 'New Car Promise (Model 2023+)', price: 249 }
  ];

  const handleToggleAddon = (addon) => {
    if (selectedAddons.find(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const finalTotal = selectedFare.totalFare + addonsTotal;

  const createWhatsAppUrl = (phone, msg) => {
    const encoded = encodeURIComponent(msg);
    const cleanedPhone = phone.replace(/\D/g, '');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      return `whatsapp://send?phone=${cleanedPhone}&text=${encoded}`;
    }
    return `https://web.whatsapp.com/send?phone=${cleanedPhone}&text=${encoded}`;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      ReactGA.event("checkout_submit", {
        category: "Conversion",
        label: "Checkout Form Booking",
        value: finalTotal
      });

      const addonText = selectedAddons.length > 0 
        ? `\n➕ Add-ons:\n${selectedAddons.map(a => `- ${a.title} (₹${a.price})`).join('\n')}` 
        : '\n➕ Add-ons: None';

      let messageText = `🚖 *New Booking Request* - Urgent Taxis (${locationData.city})\n\n`;
      messageText += `👤 *Customer:* ${name} (${gender})\n`;
      messageText += `📞 *Mobile:* ${mobile}\n`;
      messageText += `📧 *Email:* ${email || 'N/A'}\n\n`;
      
      messageText += `🚕 *Trip Type:* ${tripType}\n`;
      messageText += `📍 *Pickup:* ${pickup} ${pickupLandmark ? '(' + pickupLandmark + ')' : ''}\n`;
      messageText += `📍 *Drop:* ${drop || localPackage} ${dropLandmark ? '(' + dropLandmark + ')' : ''}\n`;
      messageText += `📅 *Date & Time:* ${date} at ${time}\n`;
      if (tripType === 'Round Trip' && returnDate) {
        messageText += `📅 *Return Date:* ${returnDate}\n`;
      }
      
      messageText += `\n🚘 *Vehicle:* ${selectedFare.category}\n`;
      messageText += `👥 *Passengers:* ${passengers} | 💼 *Luggage:* ${luggage}\n`;
      
      messageText += `\n📏 *Distance:* ${selectedFare.originalDistanceKm || distanceKm} km (Est.)\n`;
      messageText += `⏱️ *Travel Time:* ${selectedFare.travelTime}\n`;
      
      messageText += `\n💵 *Fare Breakup:*\n`;
      messageText += `- Base Fare/Package: ₹${selectedFare.distanceCharge}\n`;
      if (selectedFare.peakApplied && selectedFare.peakAdjustment > 0) {
        messageText += `- Peak Adjustment: ₹${selectedFare.peakAdjustment}\n`;
      }
      messageText += `- Taxes & Fees: ₹${selectedFare.totalFare - selectedFare.distanceCharge - (selectedFare.peakAdjustment || 0)}\n`;
      messageText += `${addonText}\n`;
      messageText += `-----------------------\n`;
      messageText += `💰 *Final Total Fare: ₹${finalTotal}*\n`;
      messageText += `-----------------------\n\n`;
      messageText += `🌐 Source: ${window.location.hostname} Checkout Engine`;

      // Save to Supabase
      const payload = {
        name,
        mobile,
        email,
        pickup,
        drop_location: drop || localPackage,
        trip_date: date,
        trip_type: tripType,
        vehicle_type: selectedFare.category,
        estimated_fare: finalTotal,
        distance_km: selectedFare.originalDistanceKm || distanceKm,
        travel_time: selectedFare.travelTime,
        message: messageText,
        source_page: '/checkout',
        lead_source: "Checkout Engine v2",
        fare_breakup: selectedFare,
        passenger_count: passengers,
        luggage_count: luggage,
        pickup_landmark: pickupLandmark
      };

      await supabase.from('leads').insert([payload]);

      // Redirect to WhatsApp
      const whatsappUrl = createWhatsAppUrl(locationData.whatsapp, messageText);
      window.location.href = whatsappUrl;

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try calling us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const carImg = VEHICLE_IMAGES[selectedFare.category] || carDzire;
  const info = getVehicleSeatsAndLuggage(selectedFare.category, selectedFare.seats);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-[72px]">
      {/* Header */}
      <div className="bg-[#0b1324] text-white py-4 px-4 sticky top-[72px] z-40 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition flex-shrink-0 cursor-pointer">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="ml-3 min-w-0 flex-1">
            <h1 className="font-bold text-[16px] md:text-[18px] truncate">Review Your Booking</h1>
            <p className="text-gray-300 text-[12px] truncate">{pickup} to {drop || localPackage}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column - Details */}
          <div className="flex-1 space-y-6">
            
            {/* Trip Summary Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-[18px] text-gray-900 truncate max-w-[200px] md:max-w-md">{pickup} <ArrowRight className="inline w-4 h-4 mx-1 text-gray-400" /> {drop || localPackage}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-600 mt-2">
                    <span className="flex items-center bg-gray-100 px-2 py-1 rounded"><Navigation className="w-3.5 h-3.5 mr-1" /> {tripType}</span>
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {date} at {time}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <img src={carImg} alt={selectedFare.category} className="h-12 object-contain ml-auto" />
                  <div className="font-bold text-[13px] text-gray-900 mt-1">{selectedFare.category}</div>
                  <div className="text-[10px] text-gray-500">{info.seats} | {info.luggage}</div>
                </div>
              </div>
            </div>

            {/* Contact & Pickup Details */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                <h3 className="font-bold text-[15px] text-gray-900 flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-600" /> Contact & Pickup Details
                </h3>
              </div>
              <div className="p-5">
                <form id="checkout-form" onSubmit={handleBooking} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Full Name *</label>
                      <input 
                        type="text" required value={name} onChange={e => setName(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Mobile Number *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-[14px]">+91</span>
                        <input 
                          type="tel" required value={mobile} onChange={e => setMobile(e.target.value)}
                          className="flex-1 w-full px-3 py-2.5 border border-gray-300 rounded-r-lg text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="10-digit number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Email ID (Optional)</label>
                      <input 
                        type="email" value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="For booking confirmation"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Gender</label>
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center text-[14px] cursor-pointer"><input type="radio" name="gender" checked={gender==='Male'} onChange={()=>setGender('Male')} className="mr-2" /> Male</label>
                        <label className="flex items-center text-[14px] cursor-pointer"><input type="radio" name="gender" checked={gender==='Female'} onChange={()=>setGender('Female')} className="mr-2" /> Female</label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Passengers</label>
                      <select value={passengers} onChange={e => setPassengers(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={`${n} Passenger`}>{n} Passenger{n>1?'s':''}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Luggage</label>
                      <select value={luggage} onChange={e => setLuggage(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                        <option value="No Luggage">No Luggage</option>
                        {[1,2,3,4,5].map(n => <option key={n} value={`${n} Bag${n>1?'s':''}`}>{n} Bag{n>1?'s':''}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <label className="block text-[12px] font-bold text-gray-700 mb-1">Exact Pickup Address / Terminal</label>
                    <textarea 
                      required value={pickupLandmark} onChange={e => setPickupLandmark(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[60px]"
                      placeholder="Flat No, Building, Landmark..."
                    ></textarea>
                  </div>
                  {tripType !== 'Local Rental' && (
                    <div>
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Exact Drop Address / Terminal (Optional)</label>
                      <textarea 
                        value={dropLandmark} onChange={e => setDropLandmark(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[60px]"
                        placeholder="Destination address details..."
                      ></textarea>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Personalize Your Journey */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                <h3 className="font-bold text-[15px] text-gray-900 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-blue-600" /> Personalize Your Journey
                </h3>
              </div>
              <div className="p-0">
                {addonsList.map((addon, idx) => {
                  const isSelected = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <label key={addon.id} className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${idx !== addonsList.length - 1 ? 'border-b border-gray-100' : ''} ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => handleToggleAddon(addon)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="ml-3">
                          <div className="text-[14px] font-semibold text-gray-900 flex items-center">
                            {addon.title}
                            {addon.popular && <span className="ml-2 text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-bold">Popular</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-[14px] font-bold text-gray-900">₹{addon.price}</div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-green-200 bg-green-50/30">
                <h4 className="font-bold text-green-700 mb-2 pb-1 border-b border-green-100 flex items-center text-[13px]">
                  <CheckCircle2 className="w-4 h-4 mr-1 text-green-600" /> Inclusions
                </h4>
                <ul className="space-y-1 text-gray-700 text-[12px]">
                  <li>• Base Fare for {selectedFare.originalDistanceKm || 'applicable'} kms</li>
                  {tripType === 'One Way' && selectedFare.routeSource === 'static_route' && (
                    <><li>• Toll Charges</li><li>• State Taxes</li></>
                  )}
                  <li>• Driver Allowance</li>
                  <li>• GST (5%)</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-xl border border-red-200 bg-red-50/30">
                <h4 className="font-bold text-red-700 mb-2 pb-1 border-b border-red-100 flex items-center text-[13px]">
                  <AlertCircle className="w-4 h-4 mr-1 text-red-600" /> Exclusions
                </h4>
                <ul className="space-y-1 text-gray-700 text-[12px]">
                  {tripType !== 'One Way' || selectedFare.routeSource !== 'static_route' ? (
                    <><li>• Tolls & State Taxes</li></>
                  ) : null}
                  <li>• Parking Fees</li>
                  <li>• Extra KM Charges</li>
                  <li>• Extra Waiting Time</li>
                </ul>
              </div>
            </div>
            
          </div>

          {/* Right Column - Payment & Summary */}
          <div className="w-full lg:w-[380px] flex-shrink-0 space-y-6">
            
            {/* Free Cancellation Banner */}
            <div className="bg-green-50 border border-green-200 p-3 rounded-xl flex items-center shadow-sm">
              <ShieldCheck className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
              <div className="text-[12px] text-green-800 font-medium leading-tight">Free cancellation till 1 hr of departure. Assured cab & on-time pickup.</div>
            </div>

            {/* Payment Options (Mock UI) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-bold text-[15px] text-gray-900">Payment Options</h3>
              </div>
              <div className="p-3">
                <label className="flex items-center justify-between p-3 border border-blue-500 bg-blue-50 rounded-lg cursor-pointer mb-2 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                  <div className="flex items-center">
                    <input type="radio" checked readOnly className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer" />
                    <div className="ml-3">
                      <div className="text-[14px] font-bold text-gray-900">Book at zero</div>
                      <div className="text-[11px] text-gray-500">Pay full amount later to driver</div>
                    </div>
                  </div>
                  <div className="text-[15px] font-black text-gray-900">₹0</div>
                </label>
                <div className="p-3 border border-gray-100 rounded-lg opacity-50 cursor-not-allowed flex items-center justify-between">
                  <div className="flex items-center">
                    <input type="radio" disabled className="w-4 h-4" />
                    <div className="ml-3">
                      <div className="text-[14px] font-bold text-gray-900">Pay 25% Now</div>
                      <div className="text-[11px] text-gray-500">Rest to driver</div>
                    </div>
                  </div>
                  <div className="text-[15px] font-bold text-gray-900">₹{Math.round(finalTotal * 0.25)}</div>
                </div>
              </div>
            </div>

            {/* Fare Breakup */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-bold text-[15px] text-gray-900">Fare Breakup</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-600">Base Fare / Package</span>
                  <span className="font-semibold text-gray-900">₹{selectedFare.distanceCharge}</span>
                </div>
                {selectedFare.peakApplied && selectedFare.peakAdjustment > 0 && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-gray-600">Peak Adjustment</span>
                    <span className="font-semibold text-gray-900">₹{selectedFare.peakAdjustment}</span>
                  </div>
                )}
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-600">Taxes & Fees (inc. GST)</span>
                  <span className="font-semibold text-gray-900">₹{selectedFare.totalFare - selectedFare.distanceCharge - (selectedFare.peakAdjustment || 0)}</span>
                </div>
                {selectedAddons.map(addon => (
                  <div key={addon.id} className="flex justify-between text-[13px]">
                    <span className="text-gray-600">{addon.title}</span>
                    <span className="font-semibold text-gray-900">₹{addon.price}</span>
                  </div>
                ))}
                
                <div className="border-t border-dashed border-gray-200 pt-3 mt-3 flex justify-between items-center">
                  <span className="font-black text-gray-900 text-[16px]">Total Fare</span>
                  <span className="font-black text-[22px] text-[#00914d]">₹{finalTotal}</span>
                </div>
              </div>
            </div>

            {/* Sticky Action Button */}
            <button 
              type="submit" 
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full bg-[#ef6614] hover:bg-[#d55910] text-white py-3.5 rounded-xl font-bold text-[16px] shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Proceed / Confirm Booking'}
            </button>
            <p className="text-center text-[11px] text-gray-500 mt-2 pb-6">
              By proceeding, you agree to our Terms & Privacy Policy.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
