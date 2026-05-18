import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Check, Star, Sparkles, Heart } from 'lucide-react';
import { LiquidButton } from '../Layout';
import { useEffect, useState } from 'react';

const groomServices = [
  { name: "HD Natural Groom Makeup", price: "₹2,999" },
  { name: "Premium Groom Makeup", price: "₹4,999" },
  { name: "Airbrush Groom Makeup", price: "₹6,999" },
  { name: "Engagement Look Makeup", price: "₹3,999" },
  { name: "Reception Groom Makeup", price: "₹5,999" },
  { name: "Party Makeup For Men", price: "₹2,499" },
  { name: "Camera Ready Makeup", price: "₹3,499" },
  { name: "Beard Definition Makeup", price: "₹1,499" },
  { name: "Hair Concealing / Patch Cover", price: "₹1,999" },
  { name: "Instant Glow Finish", price: "₹999" },
];

const groomLooks = [
  { name: "Classic Groom Look", desc: "Natural Makeup + Hair Styling + Beard Finish", price: "₹4,999" },
  { name: "Premium Groom Look", desc: "HD Makeup + Hair Styling + Beard Detailing", price: "₹7,999" },
  { name: "Royal Groom Look", desc: "Airbrush Makeup + Hair Styling + Beard Styling + Skin Glow Finish", price: "₹11,999", premium: true },
];

const groomPackages = [
  {
    name: "Groom Package – 1 (Premium)",
    originalPrice: "₹21,790",
    price: "₹18,999",
    desc: "A refined grooming experience designed for the modern groom.",
    highlight: false,
    items: [
      "Groom Haircut With Styling",
      "Hair Spa",
      "Beard Grooming",
      "D-Tan Face, Neck & Back",
      "Gold / Pearl / Whitening Facial",
      "Crystal Spa Pedicure",
      "Crystal Spa Manicure",
      "Full Body Scrub",
      "Body Polishing"
    ]
  },
  {
    name: "Groom Package – 2 (Luxury)",
    originalPrice: "₹24,591",
    price: "₹21,999",
    desc: "The ultimate luxury grooming preparation for a flawless look on your big day.",
    highlight: true,
    items: [
      "Groom Haircut With Styling",
      "Hair Spa",
      "Beard Grooming",
      "D-Tan Face, Neck & Back",
      "O3 Groom Glow Facial",
      "Ice Cream Spa Pedicure",
      "Ice Cream Spa Manicure",
      "Full Body Scrub",
      "Body Polishing"
    ]
  }
];

const bridalMakeovers = [
  { name: "Bridal Saree Draping", levels: "Artist ₹549 / Sr. Artist ₹749 / Expert ₹1,249" },
  { name: "Hairdo - Regular", levels: "Artist ₹899 / Sr. Artist ₹1,199 / Expert ₹1,499" },
  { name: "Hairdo - Creative", levels: "Artist ₹1,499 / Sr. Artist ₹1,999 / Expert ₹2,499" },
];

const bridalTrials = [
  { name: "Trial Hairdo (Max 3 Hairdos)", levels: "Artist ₹749 / Sr. Artist ₹1,049 / Expert ₹1,349" },
  { name: "Trial Makeup (Half Face / One Look)", levels: "Artist ₹949 / Sr. Artist ₹1,449 / Expert ₹1,949" },
  { name: "HD Airbrush Makeup Trial", levels: "Sr. Artist ₹2,749 / Expert ₹3,499" },
];

const bridalMakeup = [
  { name: "Party Makeup", desc: "Foundation, Lip Makeup, Basic Eye Shadow", levels: "Artist ₹1,499 / Sr. Artist ₹1,999 / Expert ₹2,499" },
  { name: "Bridal Makeup", levels: "Artist ₹4,999 / Sr. Artist ₹9,999 / Expert ₹12,999" },
  { name: "HD Airbrush Makeup", levels: "Sr. Artist ₹14,999 / Expert ₹19,999", premium: true },
];

const bridalCombos = [
  { 
    name: "Bridal Makeover Combo", 
    desc: "Makeup, Hairdo, Saree Draping, Nail File & Polish", 
    levels: "Artist ₹6,299 / Sr. Artist ₹11,199 / Expert ₹14,399" 
  },
  { 
    name: "HD Airbrush Bridal Makeover", 
    desc: "Makeup, Hairdo, Saree Draping, Nail File & Polish", 
    levels: "Sr. Artist ₹15,299 / Expert ₹20,199",
    premium: true 
  },
];

const mehendiServices = [
  { name: "Arabic", price: "₹365 (Per Side)" },
  { name: "Leg", price: "₹515 (Per Side)" },
  { name: "Normal", price: "₹525 (Per Side)" },
  { name: "Bridal Special", price: "₹4,000 Onwards", premium: true },
];

const bridalPackages = [
  {
    name: "Bridal Package – 1 (Premium)",
    originalPrice: "₹23,898",
    price: "₹20,999",
    desc: "A refined bridal preparation designed to enhance your natural elegance.",
    highlight: false,
    items: [
      "Hair Cut With Styling",
      "Hair Spa",
      "Threading",
      "Full Arms & Legs Waxing (Premium)",
      "Under Arms Waxing (Premium)",
      "D-Tan Face & Neck & Back",
      "Gold / Pearl / Whitening Facial",
      "Crystal Spa Pedicure & Manicure",
      "Full Body Scrub & Polishing"
    ]
  },
  {
    name: "Bridal Package – 2 (Luxury)",
    originalPrice: "₹25,098",
    price: "₹22,999",
    desc: "A complete luxury bridal transformation crafted for flawless radiance.",
    highlight: true,
    items: [
      "Hair Cut With Styling",
      "Hair Spa",
      "Threading",
      "Full Arms & Legs Waxing (Luxury)",
      "Under Arms Waxing (Luxury)",
      "D-Tan Face & Neck & Back",
      "O3 Bridal Glow Facial",
      "Ice Cream Pedicure & Manicure",
      "Full Body Scrub & Polishing"
    ]
  }
];

const faqs = [
  {
    q: "How early should I book my wedding package?",
    a: "We recommend booking at least 3–4 weeks in advance to plan treatments perfectly."
  },
  {
    q: "Can I customize the wedding package?",
    a: "Yes, our experts can tailor services based on your skin and hair needs."
  },
  {
    q: "Do you provide trial makeup?",
    a: "Yes, we provide trial hairdo and makeup sessions before your wedding date."
  },
  {
    q: "Is premium or luxury package worth it?",
    a: "Premium/Luxury includes advanced treatments (like O3 Glow Facials and Ice Cream Spa) for enhanced bridal/groom radiance."
  }
];

export default function WeddingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl mb-6 leading-tight"
          >
            Your Perfect Wedding, <br/><span className="text-brand-400 italic font-light">Realized.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 font-light text-lg mb-8"
          >
            We curate flawless bridal and groom looks that reflect your distinct personality. Using only premium products and masterful techniques, we ensure you radiate elegance on your special day.
          </motion.p>
          <div className="w-12 h-[1px] bg-brand-400 mx-auto"></div>
        </div>

        {/* BRIDAL SECTION */}
        <div id="bridal" className="mb-24 scroll-mt-32">
          <div className="flex items-center gap-4 mb-10">
             <Heart className="text-brand-400" size={32} />
             <h2 className="font-serif text-4xl">Bridal Makeovers</h2>
             <div className="flex-1 h-px bg-gradient-to-r from-brand-400/50 to-transparent"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12 relative z-10">
            {/* Makeovers & Trials */}
            <div className="glass-heavy rounded-[2rem] p-8 border border-white/5 space-y-10">
               <div>
                 <h3 className="text-xl font-serif text-brand-400 mb-6 flex items-center gap-2">
                    <Sparkles size={18} /> Makeovers & Hairdos
                 </h3>
                 <div className="space-y-4">
                    {bridalMakeovers.map((item, i) => (
                      <div key={i} className="flex flex-col border-b border-white/5 pb-4 last:border-0 last:pb-0">
                         <span className="font-medium text-white/90">{item.name}</span>
                         <span className="text-xs text-brand-400 tracking-widest mt-1">{item.levels}</span>
                      </div>
                    ))}
                 </div>
               </div>

               <div>
                 <h3 className="text-xl font-serif text-brand-400 mb-6 flex items-center gap-2">
                    <Star size={18} /> Bridal Trials
                 </h3>
                 <div className="space-y-4">
                    {bridalTrials.map((item, i) => (
                      <div key={i} className="flex flex-col border-b border-white/5 pb-4 last:border-0 last:pb-0">
                         <span className="font-medium text-white/90">{item.name}</span>
                         <span className="text-xs text-brand-400 tracking-widest mt-1">{item.levels}</span>
                      </div>
                    ))}
                 </div>
               </div>
            </div>

            {/* Makeup, Combos, Mehendi */}
            <div className="glass-heavy rounded-[2rem] p-8 border border-white/5 space-y-10">
               <div>
                 <h3 className="text-xl font-serif text-brand-400 mb-6 font-medium">Bridal Makeup</h3>
                 <div className="space-y-4">
                    {bridalMakeup.map((item, i) => (
                      <div key={i} className="flex flex-col border-b border-white/5 pb-4 pl-2 last:border-0 last:pb-0 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-400/20">
                         <div className="flex items-center gap-3">
                           <span className="font-medium text-white/90">{item.name}</span>
                           {item.premium && <span className="border border-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-medium shrink-0">Premium</span>}
                         </div>
                         {item.desc && <span className="text-xs text-brand-400/70 mt-1.5">{item.desc}</span>}
                         <span className="text-[13px] text-white/60 mt-1">{item.levels}</span>
                      </div>
                    ))}
                 </div>
               </div>

               <div>
                 <h3 className="text-xl font-serif text-brand-400 mb-6 font-medium">Bridal Makeover Combos</h3>
                 <div className="space-y-4">
                    {bridalCombos.map((item, i) => (
                      <div key={i} className="flex flex-col border-b border-white/5 pb-4 pl-2 last:border-0 last:pb-0 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-400/20">
                         <div className="flex items-center gap-3">
                           <span className="font-medium text-white/90">{item.name}</span>
                           {item.premium && <span className="border border-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-medium shrink-0">Premium</span>}
                         </div>
                         <span className="text-xs text-brand-400/70 mt-1.5 italic">Includes: {item.desc}</span>
                         <span className="text-[13px] text-white/60 mt-1">{item.levels}</span>
                      </div>
                    ))}
                 </div>
               </div>

               <div>
                 <h3 className="text-xl font-serif text-brand-400 mb-6 font-medium">Mehendi</h3>
                 <div className="grid grid-cols-2 gap-4">
                    {mehendiServices.map((item, i) => (
                      <div key={i} className="flex flex-col border border-white/5 rounded-xl p-3 bg-white/[0.02]">
                         <span className="font-medium text-sm text-white/90">{item.name}</span>
                         <span className="text-xs text-brand-400 mt-1">{item.price}</span>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* GROOM SECTION */}
        <div id="groom" className="mb-24 scroll-mt-32">
          <div className="flex items-center gap-4 mb-10">
             <Star className="text-brand-400" size={32} />
             <h2 className="font-serif text-4xl">Groom Makeovers</h2>
             <div className="flex-1 h-px bg-gradient-to-r from-brand-400/50 to-transparent"></div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
             {/* Groom Makeup */}
             <div className="lg:col-span-2 glass-heavy rounded-[2rem] p-8 border border-white/5">
                <h3 className="text-xl font-serif text-brand-400 mb-8 font-medium">Men’s Makeup</h3>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                   {groomServices.map((item, i) => (
                     <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3">
                        <span className="text-[14px] text-white/90">{item.name}</span>
                        <span className="text-[14px] font-medium text-white/60">{item.price}</span>
                     </div>
                   ))}
                </div>
             </div>

             {/* Groom Looks Packages */}
             <div className="glass-heavy rounded-[2rem] p-8 border border-brand-400/20 bg-gradient-to-br from-charcoal-800 to-black/50">
                <h3 className="text-xl font-serif text-brand-400 mb-8 font-medium">Luxury Makeup Packages</h3>
                <div className="space-y-6">
                   {groomLooks.map((look, i) => (
                     <div key={i} className="flex flex-col gap-2">
                        <div className="flex justify-between items-start gap-4">
                          <span className={`font-serif text-lg ${look.premium ? 'text-[#D4AF37]' : 'text-white/90'}`}>{look.name}</span>
                          <span className="font-bold text-brand-400 shrink-0">{look.price}</span>
                        </div>
                        <span className="text-xs text-white/50 leading-relaxed italic">{look.desc}</span>
                        {i < groomLooks.length - 1 && <div className="h-px w-full bg-white/5 mt-4"></div>}
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* PACKAGES SECTION */}
        <div id="packages" className="mb-20 scroll-mt-32">
          <div className="flex items-center gap-4 mb-10">
             <h2 className="font-serif text-4xl text-center w-full">Complete Wedding Packages</h2>
          </div>

          {/* Bridal Packages */}
          <h3 className="text-2xl font-serif text-brand-300 text-center mb-8">For The Bride</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-[1100px] mx-auto items-stretch relative mb-16">
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[500px] bg-brand-500/10 blur-[150px] -translate-y-1/2 pointer-events-none rounded-full"></div>
            {bridalPackages.map((pkg, i) => (
              <PackageCard key={`bridal-${i}`} pkg={pkg} />
            ))}
          </div>

          {/* Groom Packages */}
          <h3 className="text-2xl font-serif text-brand-300 text-center mb-8">For The Groom</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-[1100px] mx-auto items-stretch relative">
            {groomPackages.map((pkg, i) => (
              <PackageCard key={`groom-${i}`} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-16 flex flex-col items-center justify-center relative z-10">
           <div className="flex flex-col sm:flex-row gap-6 mb-6 w-full justify-center">
              <Link to="/book" className="w-full sm:w-auto">
                 <LiquidButton className="w-full bg-brand-400 hover:bg-brand-500 text-white border-transparent px-8 py-4 shadow-lg">
                    Book Wedding Consultation
                 </LiquidButton>
              </Link>
              <button 
                 onClick={() => document.getElementById('chat-widget')?.click()}
                 className="w-full sm:w-auto mt-0 px-8 py-4 glass text-white hover:text-brand-400 transition-colors uppercase tracking-[0.2em] text-[13px] space-x-2 font-bold"
              >
                 <span>Talk to Expert</span>
              </button>
           </div>
           <p className="text-sm text-brand-400 uppercase tracking-widest font-bold font-sans">
              Limited slots available each month
           </p>
        </div>

        {/* FAQs */}
        <div className="mt-32 max-w-3xl mx-auto relative z-10">
           <h2 className="font-serif text-3xl mb-10 text-center">Wedding FAQs</h2>
           <div className="space-y-4">
              {faqs.map((faq, idx) => (
                 <div key={idx} className="glass border border-white/5 rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-6 flex justify-between items-center text-left hover:bg-white/[0.02] transition-colors"
                    >
                       <span className="font-medium text-[15px] pr-8">{faq.q}</span>
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${openFaq === idx ? "bg-brand-400 text-white rotate-45" : "bg-white/5 text-white"}`}>
                          <span className="text-xl leading-none font-light">+</span>
                       </div>
                    </button>
                    <AnimatePresence>
                       {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="px-6"
                          >
                             <p className="pb-6 text-white/50 text-sm leading-relaxed">{faq.a}</p>
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}

function PackageCard({ pkg }: { pkg: any; key?: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative rounded-[2rem] overflow-hidden p-8 flex flex-col transition-all duration-300 group ${
        pkg.highlight 
          ? "bg-charcoal-800 border bg-gradient-to-br from-charcoal-800 to-black/50 border-brand-400/50 shadow-[0_0_50px_rgba(212,175,55,0.15)] hover:shadow-[0_0_80px_rgba(212,175,55,0.3)] scale-[1.02] z-10" 
          : "glass-heavy border border-white/5 hover:bg-white/[0.03]"
      }`}
    >
      {pkg.highlight && (
        <div className="absolute inset-0 bg-gradient-to-b from-brand-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      )}
      
      <div className="flex justify-between items-start mb-6 mt-2 gap-4">
         <h3 className={`font-serif text-[28px] leading-tight flex-1`}>{pkg.name.replace(/\\(.*?\\)/g, '')}</h3>
         {pkg.highlight && (
            <div className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5 shrink-0 border border-[#D4AF37]/30 whitespace-nowrap">
               <span className="text-[12px]">✨</span> <span className="hidden sm:inline pt-[1px]">Luxury</span>
            </div>
         )}
      </div>
      
      <p className="text-white/50 mb-6 font-light text-sm">{pkg.desc}</p>
      
      <div className="flex items-end gap-3 mb-8">
        <span className="text-lg line-through text-white/30 mb-1">{pkg.originalPrice}</span>
        <span className={`text-4xl font-bold tracking-tight ${pkg.highlight ? "text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-brand-400" : "text-white"}`}>
          {pkg.price}
        </span>
      </div>

      <div className="flex-1 space-y-4 mb-4 relative z-10 bg-white/[0.02] p-5 rounded-2xl border border-white/5">
         <h4 className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-4 ${pkg.highlight ? "text-[#D4AF37]" : "text-white/40"}`}>Package Includes</h4>
         <ul className="space-y-3">
            {pkg.items.map((item: string, k: number) => (
              <li key={k} className="flex items-start gap-3">
                <Check size={14} className={`shrink-0 mt-0.5 ${pkg.highlight ? "text-[#D4AF37]" : "text-brand-400/70"}`} />
                <span className="text-white/80 font-light text-[13px]">{item}</span>
              </li>
            ))}
         </ul>
      </div>

    </motion.div>
  );
}
