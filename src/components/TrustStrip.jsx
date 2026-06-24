import { Users, ShieldCheck, IndianRupee, Clock } from 'lucide-react';

export default function TrustStrip() {
  const badges = [
    {
      icon: <Users size={22} className="text-white" />,
      iconBg: "bg-[#3b2b98]",
      title: "10,000+",
      subtitle: "Happy Customers",
      desc: "and counting"
    },
    {
      icon: <ShieldCheck size={22} className="text-white" />,
      iconBg: "bg-[#00914d]",
      title: "Verified",
      subtitle: "Drivers",
      desc: "Background verified"
    },
    {
      icon: <IndianRupee size={22} className="text-white" />,
      iconBg: "bg-[#3b2b98]",
      title: "No Hidden",
      subtitle: "Charges",
      desc: "100% Transparent"
    },
    {
      icon: <Clock size={22} className="text-white" />,
      iconBg: "bg-[#00914d]",
      title: "24/7",
      subtitle: "Support",
      desc: "We're here anytime"
    }
  ];

  return (
    <div className="w-full relative z-30 px-4 sm:px-4 lg:mt-6 pb-6" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
      <div className="w-full trust-strip-matching">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-4 md:py-6 px-4 md:px-8 grid grid-cols-2 md:flex items-center justify-between border border-slate-100 gap-4 md:gap-0">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3 md:gap-4 flex-1 justify-start md:justify-center relative">
              <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 ${badge.iconBg} shadow-sm`}>
                {badge.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] md:text-[15px] font-black text-[#0f172a] leading-tight">{badge.title}</span>
                <span className="text-[11px] md:text-[13px] font-black text-[#0f172a] leading-tight">{badge.subtitle}</span>
                <span className="text-[9px] md:text-[11px] text-slate-500 font-medium mt-0.5">{badge.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
