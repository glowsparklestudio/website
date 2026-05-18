import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { LiquidButton } from '../Layout';
import { Sparkles, ArrowRight, Plus, Minus, X, Calendar, Clock, Phone, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../Layout';
import { useAdmin } from '../contexts/AdminContext';

const defaultServiceMenu = [
  {
    id: "womens",
    title: "Women's Services",
    icon: "✨",
    subcategories: [
      {
        name: "Skin Care – Threading",
        desc: "Expert threading services for perfect shaping",
        items: [
          { name: "Eye Brow", price: "₹49" },
          { name: "Upper Lip", price: "₹49" },
          { name: "Chin", "price": "₹59" },
          { name: "Cheek", "price": "₹69" },
          { name: "Slides", "price": "₹119" },
          { name: "Forehead", "price": "₹79" },
          { name: "Full Face", "price": "₹199" }
        ]
      },
      {
        name: "Pedicure",
        desc: "Rejuvenating foot care and spas",
        items: [
          { name: "Fruit", price: "₹1,000" },
          { name: "Crystal Spa", price: "₹2,500" },
          { name: "Blueberry", price: "₹1,600" },
          { name: "Mint", price: "₹1,600" },
          { name: "Enriched (Rose/Aloe/Choco/Strawberry)", price: "₹1,800" },
          { name: "Bubblegum", price: "₹2,000" },
          { name: "D-Tan", price: "₹2,000" },
          { name: "Ice Cream", price: "₹2,500", premium: true },
          { name: "Peel Treatment", price: "₹3,000", premium: true }
        ]
      },
      {
        name: "Manicure",
        desc: "Luxury hand care and spas",
        items: [
          { name: "Fruit", price: "₹800" },
          { name: "Crystal Spa", price: "₹2,300" },
          { name: "Blueberry", price: "₹1,300" },
          { name: "Mint", price: "₹1,300" },
          { name: "Enriched (Rose/Aloe/Choco/Strawberry)", price: "₹1,500" },
          { name: "Bubblegum", price: "₹1,500" },
          { name: "D-Tan", price: "₹1,800" },
          { name: "Ice Cream", price: "₹2,000", premium: true }
        ]
      },
      {
        name: "Waxing",
        desc: "Smooth, radiant skin with premium waxes",
        items: [
          { name: "Face (Rica / Bean)", price: "₹400 / ₹500" },
          { name: "Upper Lip (Rica / Bean)", price: "₹150 / ₹250" },
          { name: "Chin (Rica / Bean)", price: "₹200 / ₹300" },
          { name: "Sidelocks (Rica / Bean)", price: "₹300 / ₹300" },
          { name: "Neck (Rica / Bean)", price: "₹300 / ₹350" },
          { name: "Ears (Rica / Bean)", price: "₹100 / ₹150" },
          { name: "Nose (Rica / Bean)", price: "₹100 / ₹200" },
          { name: "Underarms (Rica / Bean)", price: "₹200 / ₹300" },
          { name: "Full Face (Rica / Bean)", price: "₹400 / ₹500" },
          { name: "Full Arms (Rica / Rollen)", price: "₹800 / ₹1,000" },
          { name: "Half Arms (Rica / Rollen)", price: "₹500 / ₹700" },
          { name: "Full Legs (Rica / Rollen)", price: "₹1,500 / ₹1,700" },
          { name: "Half Legs (Rica / Rollen)", price: "₹1,000 / ₹1,200" },
          { name: "Full Front (Rica / Rollen)", price: "₹800 / ₹1,000" },
          { name: "Midriff (Rica / Rollen)", price: "₹500 / ₹700" },
          { name: "Back Neck (Rica / Rollen)", price: "₹500 / ₹800" },
          { name: "Full Back Neck (Rica / Rollen)", price: "₹1,000 / ₹1,300" },
          { name: "Bikini Line (Rica)", price: "₹1,500" },
          { name: "Bikini Wax (Rica)", price: "₹3,000", premium: true },
          { name: "Full Body Without Bikini (Rica)", price: "₹5,000" },
          { name: "Full Body With Bikini (Rica)", price: "₹6,000", premium: true }
        ]
      },
      {
        name: "Body Polishing",
        desc: "Cleansing, scrubbing and pack",
        items: [
          { name: "Hands Polishing", price: "₹1,500" },
          { name: "Legs Polishing", price: "₹1,800" },
          { name: "Full Body Polishing", price: "₹6,000", premium: true }
        ]
      },
      {
        name: "Shampoo & Massage",
        desc: "Relaxing head treatments and body massages",
        items: [
          { name: "Shampoo With Conditioner", price: "₹500 / ₹700" },
          { name: "Shampoo With Conditioner (Blowdry & Serum)", price: "₹1,000" },
          { name: "Head Massage 45 Min (Coconut / Almond)", price: "₹700" },
          { name: "Head Massage 45 Min (Mintol / Olive)", price: "₹1,000" },
          { name: "Foot Massage", price: "₹1,000" },
          { name: "Hands Massage", price: "₹800" },
          { name: "Back & Neck Massage", price: "₹1,000" }
        ]
      },
      {
        name: "Hair Treatments",
        desc: "Prices vary based on hair length (Short / Medium / Long)",
        items: [
          { name: "Smoothening Treatment", price: "₹3,999 / ₹4,999 / ₹5,999" },
          { name: "Straightening Root Touch Up (Re Bonding)", price: "₹3,999" },
          { name: "Keratine Treatment", price: "₹4,999 / ₹5,999 / ₹6,999", premium: true },
          { name: "Botox Treatment", price: "₹4,999 / ₹5,999 / ₹6,999", premium: true },
          { name: "Nanoplastia Hair Treatment", price: "₹4,999 / ₹5,999 / ₹6,999", premium: true }
        ]
      },
      {
        name: "Colouring",
        desc: "Premium hair coloring and highlights",
        items: [
          { name: "Streaks (Ammonia / Ammonia Free)", price: "₹500 / Per Streak" },
          { name: "Streaks (Premium)", price: "₹600 / Per Streak" },
          { name: "Root Touch Up (Ammonia)", price: "₹1,800" },
          { name: "Root Touch Up (Ammonia Free)", price: "₹2,200" },
          { name: "Root Touch Up (Premium)", price: "₹2,500" },
          { name: "Global Hair Colour (Ammonia)", price: "₹2,500+" },
          { name: "Global Hair Colour (Ammonia Free)", price: "₹2,800+" },
          { name: "Global Hair Colour (Premium)", price: "₹3,000+" },
          { name: "Global Highlights (Ammonia / Ammonia Free)", price: "₹5,000" },
          { name: "Global Highlights (Premium)", price: "₹5,500", premium: true }
        ]
      },
      {
        name: "Nail Art",
        desc: "Extensions, overlays, polish, and finishing (Prices: 10 / 1 Finger)",
        items: [
          { name: "Gum Gel Extension", price: "₹3,539 / ₹439" },
          { name: "Lexan Gel Extension", price: "₹3,539 / ₹439" },
          { name: "Nail Extension Refill - Gum Gel", price: "₹2,129 / ₹269" },
          { name: "Nail Extension Refill - Lexan Gel", price: "₹2,129 / ₹269" },
          { name: "Overlay (Lexan + Dry Glitter)", price: "₹4,489 / ₹539" },
          { name: "French Nail Polish", price: "₹2,359 / ₹289" },
          { name: "Gel Polish Application", price: "₹1,769 / ₹219" },
          { name: "Finishing - Gum Gel Extension", price: "₹949 / ₹179" },
          { name: "Finishing - Lexan Gel Extension", price: "₹949 / ₹179" },
          { name: "Finishing - Refill Gum Gel", price: "₹1,179 / ₹179" },
          { name: "Finishing - Refill Lexan Gel", price: "₹1,179 / ₹179" },
          { name: "Finishing - Overlay", price: "₹1,179 / ₹179" },
          { name: "Nail Extension Removal", price: "₹949 / ₹179" },
          { name: "Gel Polish Removal", price: "₹589 / ₹179" },
          { name: "Gel Ext. + Gel Polish + Premium Art", price: "₹5,519", premium: true },
          { name: "Gel Ext. + Gel Polish + Luxe Art", price: "₹5,739", premium: true }
        ]
      }
    ]
  },
  {
    id: "mens",
    title: "Men's Services",
    icon: "💈",
    subcategories: [
      {
        name: "Hair & Grooming Essentials",
        desc: "Precision cuts, styling, and grooming",
        items: [
          { name: "Hair Cut", price: "₹400" },
          { name: "Styling", price: "₹600+" },
          { name: "Beard & Clean Shave", price: "₹200" },
          { name: "Hair Wash", price: "₹500 / ₹800" },
          { name: "Hair Colour", price: "₹1,400 / ₹1,600" },
        ]
      },
      {
        name: "Hair Spa & Treatments",
        desc: "Revitalizing care for scalp and color",
        items: [
          { name: "Hair Spa (Classic / Premium)", price: "₹900 / ₹1,400" },
          { name: "Dandruff Treatment", price: "₹1,800" },
          { name: "Hair Fall Treatment (L'Oreal)", price: "₹1,800" },
          { name: "Hair Highlights", price: "₹1,800" },
          { name: "Beard Colour (L'Oreal)", price: "₹500" },
          { name: "Schwarzkopf Colour", price: "₹500" },
        ]
      },
      {
        name: "Facials",
        desc: "Regular, Premium and Luxury Facials",
        items: [
          { name: "Detan Fruit Facial", price: "₹1,499" },
          { name: "Brightening Facial", price: "₹2,499" },
          { name: "Pearl Glow Facial (Premium)", price: "₹1,999" },
          { name: "Gold Radiance Facial (Premium)", price: "₹2,499" },
          { name: "Diamond Elite Facial (Premium)", price: "₹2,799" },
          { name: "Wine Therapy Facial (Premium)", price: "₹2,599" },
          { name: "Anti-Age Defense Facial (Premium)", price: "₹2,899" },
          { name: "Pigmentation Control Facial (Premium)", price: "₹2,999" },
          { name: "Oxygen Boost Facial (Premium)", price: "₹2,799" },
          { name: "Skin Brightening Facial (Luxury)", price: "₹2,999", premium: true },
          { name: "Advanced Skin Lightening (Luxury)", price: "₹3,499", premium: true },
          { name: "24K Gold Luxury Facial", price: "₹3,499", premium: true },
          { name: "Vitamin-C Glow Facial (Luxury)", price: "₹3,499", premium: true },
          { name: "O3 Whitening / Seaweed Facial", price: "₹3,999", premium: true },
          { name: "Royal Groom Facial", price: "₹4,499", premium: true },
          { name: "Hydra Facial (10 Steps)", price: "₹4,999", premium: true }
        ]
      },
      {
        name: "Pedicure",
        desc: "Relaxing foot care and spa treatments",
        items: [
          { name: "Fruit", price: "₹999" },
          { name: "Crystal Spa", price: "₹2,499" },
          { name: "Blueberry", price: "₹1,599" },
          { name: "Mint", price: "₹1,599" },
          { name: "Enriched (Rose/Aloe/Choco/Strawberry)", price: "₹1,799" },
          { name: "Bubblegum", price: "₹1,999" },
          { name: "D-Tan", price: "₹1,999" },
          { name: "Ice Cream", price: "₹2,499", premium: true },
          { name: "Peel Treatment", price: "₹2,999", premium: true }
        ]
      },
      {
        name: "Manicure",
        desc: "Refreshing hand care and spa treatments",
        items: [
          { name: "Fruit", price: "₹799" },
          { name: "Crystal Spa", price: "₹2,299" },
          { name: "Blueberry", price: "₹1,299" },
          { name: "Mint", price: "₹1,299" },
          { name: "Enriched (Rose/Aloe/Choco/Strawberry)", price: "₹1,499" },
          { name: "Bubblegum", price: "₹1,499" },
          { name: "D-Tan", price: "₹1,799" },
          { name: "Ice Cream", price: "₹1,999", premium: true }
        ]
      },
      {
        name: "Waxing",
        desc: "Smooth skin with Honey, Rica and Peelable wax",
        items: [
          { name: "Honey Wax Hands", price: "₹599" },
          { name: "Honey Wax Off Legs", price: "₹799" },
          { name: "Honey Wax Full Legs", price: "₹1,499" },
          { name: "Honey Full Body", price: "₹2,999 / ₹3,999" },
          { name: "Rica Hands", price: "₹799" },
          { name: "Rica Off Legs", price: "₹999" },
          { name: "Rica Full Body", price: "₹1,999" },
          { name: "Peelable Wax Hands", price: "₹999" },
          { name: "Peelable Off Legs", price: "₹1,499" },
          { name: "Peelable Full Legs", price: "₹2,499" },
          { name: "Peelable Full Body", price: "₹4,999", premium: true }
        ]
      }
    ]
  }
];

export default function ServicesPage() {
  const { data: adminData } = useAdmin();
  const serviceMenu = adminData.serviceMenu && adminData.serviceMenu.length > 0 ? adminData.serviceMenu : defaultServiceMenu;
  const [activeTab, setActiveTab] = useState("womens");
  const [selected, setSelected] = useState<{name: string, price: string}[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', date: '', time: '' });
  const [searchQuery, setSearchQuery] = useState("");
  const [isHighlightingCart, setIsHighlightingCart] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleService = (name: string, price: string) => {
    setSelected(prev => {
      const isRemoving = prev.some(s => s.name === name);
      if (!isRemoving && prev.length === 0) {
        setIsHighlightingCart(true);
        setTimeout(() => setIsHighlightingCart(false), 2500);
      }
      return isRemoving 
        ? prev.filter(s => s.name !== name)
        : [...prev, { name, price }]
    });
  };

  const isSelected = (name: string) => selected.some(s => s.name === name);

  const getUpsellServices = () => {
    const upsells: {name: string, price: string}[] = [];
    if (selected.length === 0) return [];

    const hasFacial = selected.some(s => s.name.toLowerCase().includes('facial') || s.name.toLowerCase().includes('clean-up'));
    const hasHair = selected.some(s => s.name.toLowerCase().includes('hair') || s.name.toLowerCase().includes('botox') || s.name.toLowerCase().includes('keratin'));
    const hasPedi = selected.some(s => s.name.toLowerCase().includes('pedi') || s.name.toLowerCase().includes('mani'));
    
    // Suggest D-Tan if facial/clean-up is selected
    if (hasFacial && !selected.some(s => s.name.toLowerCase().includes('d-tan'))) {
      upsells.push({ name: 'D-Tan Face', price: '₹500 / ₹800' });
    }
    // Suggest Hair Spa if any hair service is selected (and not spa already)
    if (hasHair && !selected.some(s => s.name.toLowerCase().includes('spa'))) {
      upsells.push({ name: 'Hair Spa (Classic)', price: '₹900' });
    }
    // Suggest Mani/Pedi if not present
    if (!hasPedi && upsells.length < 2) {
      upsells.push({ name: 'Classic Mani / Pedi', price: '₹500 / ₹600' });
    }
    // General head massage if nothing else
    if (upsells.length < 2 && !selected.some(s => s.name.toLowerCase().includes('head massage'))) {
      upsells.push({ name: 'Head Massage (Coconut)', price: '₹500' });
    }
    
    return upsells.slice(0, 2);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = async () => {
    if (!formData.name || !formData.date || !formData.time) {
      alert("Please fill in your name, preferred date and time.");
      return;
    }

    setIsSubmitting(true);
    const serviceListStr = selected.map(s => `- ${s.name} (${s.price})`).join('\n');
    
    try {
       // Webhook URL from the user
       const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbxZRhmXDZFU4HzrCg6r8jrNYsmnRkn4fRylQipdQBSX0sDmqZW9PqJI__TYi8bePNjv/exec";
       if (scriptUrl) {
           const params = new URLSearchParams();
           params.append("sheetName", "Priority Booking");
           params.append("Source", "Priority Booking");
           params.append("Name", formData.name);
           params.append("Date", formData.date);
           params.append("Time", formData.time);
           params.append("Services", selected.map(s => s.name).join(', '));
           params.append("Total Items", selected.length.toString());

           await fetch(scriptUrl, {
               method: 'POST',
               mode: 'no-cors',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: params.toString()
           });
       }
    } catch(e) {
       console.error("Sheet sync failed", e);
    }
    
    setIsSubmitting(false);

    const whatsappMsg = `Hello Glow Sparkle Studio Salon!\n\nI would like to make a Priority Booking for the following services:\n\n${serviceListStr}\n\nName: ${formData.name}\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.time}\n\nPlease confirm my slot!`;
    window.open(`https://wa.me/918008385383?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
  };

  const getFilteredCategories = () => {
    if (!searchQuery.trim()) {
      return serviceMenu.find(s => s.id === activeTab)?.subcategories || [];
    }

    const query = searchQuery.toLowerCase();
    const results: any[] = [];
    
    serviceMenu.forEach(cat => {
      cat.subcategories.forEach(sub => {
        const matchingItems = sub.items.filter(item => 
          item.name.toLowerCase().includes(query) || 
          sub.name.toLowerCase().includes(query)
        );
        if (matchingItems.length > 0) {
          results.push({
            ...sub,
            displayName: `${cat.title} ⏤ ${sub.name}`,
            items: matchingItems
          });
        }
      });
    });

    return results;
  };

  return (
    <>
      <div className="pt-32 pb-24 px-6 min-h-screen relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl mb-6 leading-tight"
          >
            Service Catalogue
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-12 h-[1px] bg-brand-400 mx-auto mb-8"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/70 max-w-2xl mx-auto font-light text-lg mb-10"
          >
            Elevate your personal style with our exhaustive range of luxury grooming and clinical wellness treatments.
          </motion.p>

          <div className="flex justify-center gap-4 border-b border-white/10 pb-1 mb-8">
             <button
               onClick={() => { setActiveTab("womens"); setSearchQuery(""); }}
               className={cn(
                 "px-8 py-3 text-sm tracking-widest uppercase font-bold transition-all relative",
                 activeTab === "womens" && !searchQuery ? "text-brand-400" : "text-white/40 hover:text-white"
               )}
             >
               Women's Services
               {activeTab === "womens" && !searchQuery && (
                 <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-400" />
               )}
             </button>
             <button
               onClick={() => { setActiveTab("mens"); setSearchQuery(""); }}
               className={cn(
                 "px-8 py-3 text-sm tracking-widest uppercase font-bold transition-all relative",
                 activeTab === "mens" && !searchQuery ? "text-brand-400" : "text-white/40 hover:text-white"
               )}
             >
               Men's Services
               {activeTab === "mens" && !searchQuery && (
                 <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-400" />
               )}
             </button>
          </div>

          <div className="max-w-md mx-auto relative group">
             <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search size={18} className="text-white/40 group-focus-within:text-brand-400 transition-colors" />
             </div>
             <input 
                type="text"
                placeholder="Search treatments, services, packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-400 focus:bg-white/10 transition-all font-light shadow-inner"
             />
             {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-5 flex items-center text-white/40 hover:text-white"
                >
                  <X size={16} />
                </button>
             )}
          </div>
        </div>

        <div className="mt-12 min-h-[400px]">
           {searchQuery.trim() && getFilteredCategories().length === 0 ? (
              <div className="text-center py-20 text-white/50">
                 <p className="text-lg mb-2">No services found for "{searchQuery}"</p>
                 <button onClick={() => setSearchQuery("")} className="text-brand-400 hover:text-brand-300 transition-colors underline decoration-brand-400/30 underline-offset-4">Clear search</button>
              </div>
           ) : (
              <motion.div
                 layout="position"
                 className="columns-1 lg:columns-2 gap-8 lg:gap-12"
              >
                 <AnimatePresence>
                    {getFilteredCategories().map((sub, i) => (
                       <motion.div
                          layout="position"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          key={sub.displayName || sub.name} 
                          className={cn(
                             "glass-heavy rounded-[2rem] p-8 md:p-10 border border-white/5 transition-colors relative group break-inside-avoid inline-block w-full mb-8 lg:mb-12",
                             (searchQuery.trim() !== "" || expandedCategories.includes(sub.displayName || sub.name)) ? "hover:border-brand-400/30 hover:bg-white/[0.03]" : "hover:border-brand-400/20 cursor-pointer overflow-hidden"
                           )}
                           onClick={!(searchQuery.trim() !== "" || expandedCategories.includes(sub.displayName || sub.name)) ? () => setExpandedCategories(prev => [...prev, sub.displayName || sub.name]) : undefined}
                       >
                           <div className={cn("flex items-center justify-between gap-4 cursor-pointer", (searchQuery.trim() !== "" || expandedCategories.includes(sub.displayName || sub.name)) && "mb-2")}>
                              <h3 className="font-serif text-3xl group-hover:text-brand-400 transition-colors pointer-events-none">
                                {sub.displayName || sub.name}
                              </h3>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedCategories(prev => 
                                    (searchQuery.trim() !== "" || expandedCategories.includes(sub.displayName || sub.name)) 
                                      ? prev.filter(id => id !== (sub.displayName || sub.name))
                                      : [...prev, sub.displayName || sub.name]
                                  );
                                }}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0 backdrop-blur-md z-10"
                              >
                                {(searchQuery.trim() !== "" || expandedCategories.includes(sub.displayName || sub.name)) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                              </button>
                           </div>
                           
                           {(searchQuery.trim() !== "" || expandedCategories.includes(sub.displayName || sub.name)) && (
                             <motion.div
                               initial={{ opacity: 0, height: 0 }}
                               animate={{ opacity: 1, height: "auto" }}
                               exit={{ opacity: 0, height: 0 }}
                               className="overflow-hidden relative"
                             >
                          <p className="text-sm font-light text-white/40 mb-8 pb-6 border-b border-white/5">{sub.desc}</p>
                          
                          <div className="flex flex-col gap-4">
                             {sub.items.map((item: any, j: number) => (
                                <div key={j} className="flex justify-between items-center gap-3 py-4 border-b border-white/10 last:border-0 group/item">
                                   <div className="flex flex-col gap-1.5 flex-1 min-w-0 pr-2">
                                      {item.premium && (
                                        <div className="flex items-center gap-1 text-[#D4AF37] border border-[#D4AF37]/20 px-2 py-0.5 rounded-full w-fit mb-1 shadow-sm shrink-0">
                                          <Sparkles size={8} className="opacity-80" />
                                          <span className="text-[9px] uppercase tracking-[0.2em] font-medium pt-[1px]">Recommended</span>
                                        </div>
                                      )}
                                      <h4 className={cn("text-[15px] md:text-base font-light leading-snug truncate whitespace-normal transition-colors group-hover/item:text-brand-300", item.premium ? "text-white" : "text-white/80")}>
                                         {item.name}
                                      </h4>
                                      <span className={cn("text-sm font-medium transition-colors group-hover/item:text-brand-300", item.premium ? "text-[#D4AF37]" : "text-white/60")}>
                                         {item.price}
                                      </span>
                                   </div>
                                   
                                   <div className="shrink-0">
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); toggleService(item.name, item.price); }}
                                        className={cn(
                                          "min-w-[76px] h-8 px-3 rounded-full flex items-center justify-center gap-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-300 border active:scale-95 shadow-sm hover:shadow-md",
                                          isSelected(item.name) 
                                             ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]" 
                                             : "border-white/10 text-white/70 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:bg-white/[0.02]"
                                        )}
                                      >
                                        {isSelected(item.name) ? 'Added' : 'Add +'}
                                      </button>
                                   </div>
                                </div>
                             ))}
                          </div>
                             </motion.div>
                           )}
                       </motion.div>
                    ))}
                 </AnimatePresence>
              </motion.div>
           )}
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-20 relative rounded-[2rem] overflow-hidden group border border-brand-400/20"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 to-black z-10 opacity-60 mix-blend-multiply"></div>
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1594124376326-faee904cc973?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
           
           <div className="relative z-20 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-8 bg-charcoal-900/60 backdrop-blur-sm">
              <div className="text-center md:text-left max-w-2xl">
                 <div className="inline-flex items-center gap-2 text-brand-400 text-[10px] uppercase font-bold tracking-[0.3em] mb-4">
                    <Sparkles size={12} /> Exquisite Bridal Experience
                 </div>
                 <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white drop-shadow-md">The Signature Bridal Packages</h2>
                 <p className="text-white/80 font-light text-base md:text-lg">Discover our premium and classic pre-bridal to bridal transformations, meticulously curated for your big day starting at ₹20,999.</p>
              </div>
              <Link to="/wedding" className="shrink-0">
                 <button className="bg-brand-400 hover:bg-brand-500 text-white shadow-[0_10px_30px_rgba(212,175,55,0.4)] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-3 transition-colors">
                    Explore Bridal <ArrowRight size={16} />
                 </button>
              </Link>
           </div>
        </motion.div>

        <div className="mt-24 text-center max-w-2xl mx-auto flex flex-col items-center">
            <h3 className="font-serif text-3xl mb-6">Ready for your transformation?</h3>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-4">
              <Link to="/book" className="w-full sm:w-auto">
                 <LiquidButton className="w-full bg-brand-400 hover:bg-brand-500 text-white border-transparent px-10 py-4 shadow-lg text-xs uppercase tracking-[0.15em]">
                    Book Appointment
                 </LiquidButton>
              </Link>
              <button 
                 onClick={() => document.getElementById('chat-widget')?.click()}
                 className="w-full sm:w-auto px-10 py-4 glass text-white hover:text-brand-400 transition-colors uppercase tracking-[0.15em] text-xs font-bold"
              >
                 Talk to Expert
              </button>
           </div>
        </div>

        {/* Dim Overlay when adding item to cart */}
        <AnimatePresence>
           {isHighlightingCart && (
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="fixed inset-0 bg-black/80 z-[9990] pointer-events-none"
              />
           )}
        </AnimatePresence>
      </div>
    </div>

    {/* Floating Cart Bar - Fixed Bottom Middle */}
    {typeof document !== 'undefined' && createPortal(
    <AnimatePresence>
      {selected.length > 0 && (
        <motion.div 
           initial={{ y: 100, opacity: 0, scale: 0.95 }}
           animate={{ y: 0, opacity: 1, scale: 1 }}
           exit={{ y: 100, opacity: 0, scale: 0.95 }}
           style={{ zIndex: 9999 }}
           className={cn(
             "fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto transition-all duration-500 w-[92%] sm:w-fit max-w-[420px]",
             isHighlightingCart ? "scale-105" : ""
           )}
        >
           <div 
             style={{ WebkitBackdropFilter: 'blur(24px)', backdropFilter: 'blur(24px)' }}
             className={cn(
             "border rounded-[999px] p-2 pr-2 flex items-center justify-between gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-colors duration-500 mx-auto",
             isHighlightingCart ? "bg-charcoal-800/95 border-brand-400/60 shadow-[0_0_50px_rgba(212,175,55,0.4)]" : "bg-black/80 border-brand-400/30 glow-border"
           )}>
              <div className="flex items-center justify-center gap-3 pl-3 pr-2 shrink-0">
                 <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-400 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(212,175,55,0.5)] relative overflow-hidden">
                    <AnimatePresence mode="popLayout">
                       <motion.span 
                          key={selected.length}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="absolute"
                       >
                          {selected.length}
                       </motion.span>
                    </AnimatePresence>
                 </div>
                 <span className="text-[11px] md:text-[13px] font-bold uppercase tracking-widest text-white/90 shrink-0">Selected</span>
              </div>
              <button 
                 onClick={() => setIsDrawerOpen(true)}
                 className="bg-white text-black hover:bg-brand-50 px-5 py-3 md:py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-[0_4px_15px_rgba(255,255,255,0.1)] flex items-center gap-2 relative overflow-hidden group shrink-0"
              >
                 <span className="relative z-10 transition-colors group-hover:text-brand-600">Review</span>
                 <ArrowRight size={14} className="text-brand-500 relative z-10 transition-transform group-hover:translate-x-1" />
              </button>
           </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
    )}

    {/* Booking Modal */}
    {typeof document !== 'undefined' && createPortal(
    <AnimatePresence>
       {isDrawerOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDrawerOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
             />
             <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-4xl bg-charcoal-900 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col rounded-[2rem] max-h-[90vh] md:max-h-[85vh] overflow-hidden"
             >
                <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center bg-charcoal-800/50 relative z-20 shrink-0">
                   <h2 className="font-serif text-xl md:text-2xl">Review & Book</h2>
                   <button onClick={() => setIsDrawerOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full glass hover:bg-white/10 transition-colors">
                      <X size={18} />
                   </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-5 md:p-8 relative z-10 bg-charcoal-900 custom-scrollbar">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                       <div className="space-y-8 md:border-r md:border-white/10 md:pr-12">
                           {/* Selected Services */}
                           <div>
                              <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4 font-bold">Selected Services ({selected.length})</h3>
                              <div 
                                 className="space-y-3"
                              >
                                 {selected.map((s, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-white/5 p-3.5 rounded-xl border border-white/5 shrink-0">
                                       <span className="text-sm font-medium pr-2 max-w-[65%] leading-tight">{s.name}</span>
                                       <div className="flex items-center gap-4 shrink-0">
                                          <span className="text-sm text-brand-400 font-medium">{s.price}</span>
                                          <button onClick={() => toggleService(s.name, s.price)} className="text-white/30 hover:text-red-400 transition-colors">
                                             <Minus size={16} />
                                          </button>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                           
                           {/* Upsell / Suggested */}
                           {getUpsellServices().length > 0 && (
                              <div>
                                 <div className="flex items-center gap-2 mb-4">
                                    <Sparkles size={14} className="text-[#D4AF37]" />
                                    <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Perfect Add-ons</h3>
                                 </div>
                                 <div className="space-y-3">
                                    {getUpsellServices().map((s, idx) => (
                                       <div key={idx} className="flex justify-between items-center border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-3.5 rounded-xl">
                                          <span className="text-sm font-medium text-white/90 pr-2 max-w-[65%] leading-tight">{s.name}</span>
                                          <div className="flex items-center gap-4 shrink-0">
                                             <span className="text-sm text-[#D4AF37] font-medium">{s.price}</span>
                                             <motion.button 
                                               whileTap={{ scale: 0.9 }}
                                               onClick={() => toggleService(s.name, s.price)} 
                                               className="w-10 h-10 md:w-7 md:h-7 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-colors shrink-0 active:bg-[#D4AF37] active:text-white"
                                             >
                                                <Plus size={14} />
                                             </motion.button>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           )}
                       </div>

                       <div className="space-y-8 flex flex-col h-full">
                           {/* Booking Details */}
                           <div className="bg-white/5 p-5 md:p-6 rounded-2xl border border-white/10 flex-1">
                              <h3 className="text-xs uppercase tracking-widest text-white/50 mb-5 font-bold">Your Details</h3>
                              <div className="space-y-4">
                                 <div>
                                    <label className="block text-xs text-white/50 mb-1.5 ml-1">Name</label>
                                    <input 
                                      type="text" 
                                      value={formData.name}
                                      onChange={e => setFormData({...formData, name: e.target.value})}
                                      placeholder="Jane Doe" 
                                      className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-400 transition-colors"
                                    />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div>
                                       <label className="block text-xs text-white/50 mb-1.5 ml-1">Date</label>
                                       <div className="relative">
                                          <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 z-10 pointer-events-none" />
                                          <input 
                                            type="date" 
                                            min={new Date().toISOString().split('T')[0]}
                                            value={formData.date}
                                            onChange={e => setFormData({...formData, date: e.target.value})}
                                            className="w-full bg-charcoal-900 border border-white/10 rounded-xl pl-9 pr-4 py-3.5 text-sm focus:outline-none focus:border-brand-400 transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:invert-[1] [&::-webkit-calendar-picker-indicator]:opacity-50 relative z-0"
                                          />
                                       </div>
                                    </div>
                                    <div>
                                       <label className="block text-[11px] text-white/50 mb-1.5 ml-1 whitespace-nowrap">Time (9 AM - 9 PM)</label>
                                       <div className="relative">
                                          <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 z-10 pointer-events-none" />
                                          <select 
                                            value={formData.time}
                                            onChange={e => setFormData({...formData, time: e.target.value})}
                                            className="w-full bg-charcoal-900 border border-white/10 rounded-xl pl-9 pr-4 py-3.5 text-sm focus:outline-none focus:border-brand-400 transition-colors appearance-none relative z-0"
                                          >
                                            <option value="" disabled>Select Time</option>
                                            <optgroup label="Morning">
                                              <option value="09:00">09:00 AM</option>
                                              <option value="09:30">09:30 AM</option>
                                              <option value="10:00">10:00 AM</option>
                                              <option value="10:30">10:30 AM</option>
                                              <option value="11:00">11:00 AM</option>
                                              <option value="11:30">11:30 AM</option>
                                            </optgroup>
                                            <optgroup label="Afternoon">
                                              <option value="12:00">12:00 PM</option>
                                              <option value="12:30">12:30 PM</option>
                                              <option value="13:00">01:00 PM</option>
                                              <option value="13:30">01:30 PM</option>
                                              <option value="14:00">02:00 PM</option>
                                              <option value="14:30">02:30 PM</option>
                                              <option value="15:00">03:00 PM</option>
                                              <option value="15:30">03:30 PM</option>
                                            </optgroup>
                                            <optgroup label="Evening">
                                              <option value="16:00">04:00 PM</option>
                                              <option value="16:30">04:30 PM</option>
                                              <option value="17:00">05:00 PM</option>
                                              <option value="17:30">05:30 PM</option>
                                              <option value="18:00">06:00 PM</option>
                                              <option value="18:30">06:30 PM</option>
                                              <option value="19:00">07:00 PM</option>
                                              <option value="19:30">07:30 PM</option>
                                              <option value="20:00">08:00 PM</option>
                                              <option value="20:30">08:30 PM</option>
                                              <option value="21:00">09:00 PM</option>
                                            </optgroup>
                                          </select>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           
                           {/* Priority Booking Button - placed inline to scroll with details */}
                           <div className="pt-2 pb-12 md:pb-6 mt-auto">
                               <button 
                                  onClick={handleBooking}
                                  className="w-full bg-brand-400 hover:bg-brand-500 text-white rounded-xl py-4 md:py-5 font-bold uppercase tracking-widest text-[13px] flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-[0_10px_30px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={selected.length === 0 || isSubmitting}
                               >
                                  {isSubmitting ? (
                                     <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Processing...
                                     </span>
                                  ) : (
                                     <>
                                        <Phone size={16} /> Priority Booking via WhatsApp
                                     </>
                                  )}
                               </button>
                           </div>
                       </div>
                    </div>
                </div>
             </motion.div>
          </div>
       )}
    </AnimatePresence>,
    document.body
    )}
  </>
  );
}
