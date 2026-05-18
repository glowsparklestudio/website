import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, Instagram, Facebook, Youtube, Phone, MapPin, MessageSquare, Send, ChevronDown, Star } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOptimizedImageUrl(url: string) {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    let id = '';
    if (url.includes('id=')) {
      id = url.split('id=')[1].split('&')[0];
    } else if (url.includes('/d/')) {
      id = url.split('/d/')[1].split('/')[0];
    }
    if (id) {
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
    }
  }
  return url;
}

export function LiquidButton({ children, className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden px-6 py-3 rounded-full font-medium transition-all duration-300",
        "bg-white/10 border border-white/20 hover:border-transparent hover:bg-brand-400 group overflow-hidden",
        "hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]",
        "active:scale-95",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gold-shift opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <span className="relative z-10 transition-colors group-hover:text-white">{children}</span>
    </motion.button>
  );
}

const navStructure = [
  { 
    name: 'Experience', 
    path: '#',
    dropdown: [
      { name: 'About Glow Sparkle Studio', path: '/about' },
      { name: 'Our Expertise', path: '/expertise' },
      { name: 'Why Choose Us', path: '/why-us' },
      { name: 'Client Testimonials', path: '/testimonials' }
    ]
  },
  { 
    name: 'Services', 
    path: '/services'
  },
  { 
    name: 'Wedding', 
    path: '/wedding',
    dropdown: [
      { name: 'Bridal Makeovers', path: '/wedding#bridal' },
      { name: 'Groom Makeovers', path: '/wedding#groom' },
      { name: 'Packages', path: '/wedding#packages' }
    ]
  },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contest', path: '/contest' },
  { name: 'Contact', path: '/contact' }
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <header className="fixed inset-x-0 z-50 transition-all duration-500 flex justify-center top-2 md:top-4">
      <div 
        style={{ WebkitBackdropFilter: 'blur(32px)', backdropFilter: 'blur(32px)', backgroundColor: 'rgba(13, 13, 13, 0.8)' }}
        className="w-full flex items-center justify-between transition-all duration-500 max-w-[1200px] rounded-2xl md:rounded-full px-4 md:px-6 py-4 md:py-3 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] mx-2 md:mx-4"
      >
        <Link to="/" className="flex items-center gap-3 group relative z-50">
          <div className="relative flex items-center justify-start transition-all duration-500 h-[60px] w-[180px] md:h-[80px] md:w-[220px] -mt-1 md:-mt-2">
            <img 
              src="/logo.png" 
              alt="Glow Sparkle Studio" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] group-active:drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
              onError={(e) => {
                // Fallback if logo.png is empty or invalid
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navStructure.map((item) => (
            <div 
              key={item.name} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.path}
                className={cn(
                  "text-[13px] xl:text-[14px] uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-1 py-4",
                  location.pathname === item.path || (item.dropdown && activeDropdown === item.name) ? "text-brand-400 font-medium" : "text-white/80 hover:text-brand-400"
                )}
              >
                {item.name}
                {item.dropdown && (
                  <ChevronDown size={14} className={cn(
                    "transition-transform duration-300",
                    activeDropdown === item.name ? "rotate-180" : ""
                  )} />
                )}
              </Link>

              {/* Mega Menu / Dropdown */}
              {item.dropdown && (
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, rotateX: -10 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: 10, rotateX: -10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 pt-2 origin-top"
                    >
                      <div className="glass-heavy w-56 rounded-xl overflow-hidden border border-brand-400/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                        {item.dropdown.map((dropItem, idx) => (
                          <Link
                            key={idx}
                            to={dropItem.path}
                            className="block px-5 py-3 text-[13px] tracking-wider text-white/70 hover:text-brand-400 hover:bg-brand-400/10 transition-colors border-b border-white/5 last:border-0"
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <Link to="/book" className="ml-2">
            <LiquidButton className="bg-brand-400 text-white border-transparent hover:bg-brand-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] text-[13px] uppercase tracking-widest px-8 shadow-lg">
              Book Now
            </LiquidButton>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden relative z-50 text-white hover:text-brand-400 transition-colors bg-white/5 p-2 rounded-lg backdrop-blur-md border border-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal-900/95 backdrop-blur-2xl z-40 lg:hidden overflow-y-auto pt-24 pb-12"
          >
            <div className="flex flex-col px-8 gap-6">
              {navStructure.map((item, idx) => (
                <div key={idx} className="flex flex-col border-b border-white/5 pb-4 last:border-0">
                  <Link
                    to={item.path}
                    className={cn(
                      "text-xl font-serif tracking-wider",
                      location.pathname === item.path ? "text-brand-400" : "text-white/90"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="mt-4 flex flex-col gap-3 pl-4 border-l border-brand-400/30">
                      {item.dropdown.map((dropItem, dIdx) => (
                        <Link
                          key={dIdx}
                          to={dropItem.path}
                          className="text-sm tracking-widest text-white/60 hover:text-brand-400 uppercase"
                          onClick={() => setIsOpen(false)}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <a href="https://wa.me/918008385383" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/80 hover:text-[#25D366] transition-colors p-4 rounded-xl bg-white/5 border border-white/10">
                   <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                   </div>
                   <div className="flex flex-col">
                      <span className="font-bold text-sm">WhatsApp Support</span>
                      <span className="text-[11px] uppercase tracking-widest text-white/50">Chat with us instantly</span>
                   </div>
                </a>
                <Link to="/book" onClick={() => setIsOpen(false)}>
                  <LiquidButton className="w-full bg-brand-400 text-white border-none py-4 text-sm tracking-[0.2em]">
                    BOOK APPOINTMENT
                  </LiquidButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-brand-400/20 bg-gradient-to-b from-charcoal-800 to-charcoal-900 pt-20 pb-8 px-6 text-white/60 relative overflow-hidden">
      {/* Abstract Red Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brand-500/10 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10 w-full px-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="h-24 md:h-32 w-full max-w-[240px] mb-6 flex justify-start -ml-2">
             <img src="/logo.png" alt="Glow Sparkle Studio Logo" className="h-full w-auto object-contain origin-left" onError={e => e.currentTarget.style.display = 'none'} />
          </div>
          <p className="text-sm leading-relaxed mb-8 max-w-md text-white/50">
            Step into a realm of sophisticated beauty and tailored elegance. Discover premium grooming and flawless bridal transformations in the heart of Visakhapatnam.
          </p>
          <div className="flex gap-4">
            <motion.a whileTap={{ scale: 0.9 }} href="https://www.instagram.com/glowsparklestudiovizag/" target="_blank" rel="noopener noreferrer" className="h-12 w-12 glass rounded-full flex items-center justify-center hover:text-brand-400 hover:border-brand-400/50 hover:bg-brand-400/10 transition-all duration-300 group">
              <Instagram size={20} className="group-hover:scale-110 transition-transform" />
            </motion.a>
            <motion.a whileTap={{ scale: 0.9 }} href="https://www.youtube.com/@GlowSparkleStudioVizag" target="_blank" rel="noopener noreferrer" className="h-12 w-12 glass rounded-full flex items-center justify-center hover:text-brand-400 hover:border-brand-400/50 hover:bg-brand-400/10 transition-all duration-300 group">
              <Youtube size={20} className="group-hover:scale-110 transition-transform" />
            </motion.a>
            <motion.a whileTap={{ scale: 0.9 }} href="https://www.facebook.com/glowsparklestudiovizag" target="_blank" rel="noopener noreferrer" className="h-12 w-12 glass rounded-full flex items-center justify-center hover:text-brand-400 hover:border-brand-400/50 hover:bg-brand-400/10 transition-all duration-300 group">
              <Facebook size={20} className="group-hover:scale-110 transition-transform" />
            </motion.a>
          </div>
        </div>
        
        <div>
          <h4 className="font-sans font-bold text-sm text-white mb-6 uppercase tracking-[0.2em]">Contact</h4>
          <div className="flex flex-col gap-6 text-sm text-white/70">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-brand-400 shrink-0 mt-1" />
              <p className="leading-relaxed">3rd Floor, Above River bike showroom,<br/>Visakha Eye Hospital Road,<br/>beside Satyam Super Market, Nauka Nagar,<br/>Polamambatemple beside, Visakhapatnam</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={20} className="text-brand-400 shrink-0" />
              <div className="flex flex-col gap-1 items-start">
                 <a href="tel:8008385383" className="hover:text-brand-400 transition-colors text-[17px] font-sans font-semibold tracking-wide">800 838 5383</a>
                 <a href="tel:8008380282" className="hover:text-brand-400 transition-colors text-[17px] font-sans font-semibold tracking-wide">800 838 0282</a>
                 <span className="text-xs tracking-wider text-white/40 uppercase mb-2">Reception</span>
                 <a href="tel:8008385383" className="inline-flex items-center justify-center gap-2 bg-brand-400/10 text-brand-400 border border-brand-400/30 px-4 py-2 rounded-full hover:bg-brand-400 hover:text-charcoal-900 transition-colors text-[10px] font-bold tracking-widest uppercase">
                    <Phone size={12} /> Call Now
                 </a>
              </div>
            </div>
          </div>
        </div>

        <div>
           <h4 className="font-sans font-bold text-sm text-white mb-6 uppercase tracking-[0.2em]">Quick Links</h4>
           <div className="flex flex-col gap-4 text-sm text-white/70 mb-8">
             <Link to="/services" className="hover:text-brand-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                <span className="h-px w-3 bg-brand-400"></span> Our Services
             </Link>
             <Link to="/wedding" className="hover:text-brand-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                <span className="h-px w-3 bg-brand-400"></span> Wedding Packages
             </Link>
             <Link to="/book" className="hover:text-brand-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                <span className="h-px w-3 bg-brand-400"></span> Book Appointment
             </Link>
             <Link to="/contest" className="hover:text-brand-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                <span className="h-px w-3 bg-brand-400"></span> Current Contest
             </Link>
           </div>
           
           <h4 className="font-sans font-bold text-xs text-white mb-4 uppercase tracking-[0.2em]">Our Links</h4>
           <div className="flex gap-4 items-start">
             <a href="https://canva.link/glowsparklestudio-men" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
               <div className="bg-white p-2 rounded-lg group-hover:scale-105 transition-transform">
                 <QRCode value="https://canva.link/glowsparklestudio-men" size={56} />
               </div>
               <span className="text-[9px] uppercase tracking-wider text-white/50 text-center group-hover:text-brand-400 transition-colors">Men</span>
             </a>
             <a href="https://canva.link/glowsparklestudio-women" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
               <div className="bg-white p-2 rounded-lg group-hover:scale-105 transition-transform">
                 <QRCode value="https://canva.link/glowsparklestudio-women" size={56} />
               </div>
               <span className="text-[9px] uppercase tracking-wider text-white/50 text-center group-hover:text-brand-400 transition-colors">Women</span>
             </a>
             <a href="https://lumelinkqrpro.netlify.app/p/glowsparklestudiovizag" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
               <div className="bg-white p-2 rounded-lg group-hover:scale-105 transition-transform">
                 <QRCode value="https://lumelinkqrpro.netlify.app/p/glowsparklestudiovizag" size={56} />
               </div>
               <span className="text-[9px] leading-tight uppercase tracking-wider text-white/50 text-center max-w-[60px] group-hover:text-brand-400 transition-colors">Digital Card</span>
             </a>
           </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.1em] uppercase text-white/40 font-medium">
        <p>&copy; {new Date().getFullYear()} Glow Sparkle Studio. All rights reserved.</p>
        <p>Crafted by <span className="text-white hover:text-brand-400 transition-colors cursor-pointer">Lume Branding</span></p>
      </div>
    </footer>
  );
}

function WhatsAppFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [inquiry, setInquiry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !inquiry) return;
    
    // Generate WhatsApp message
    const message = `Hi Glow Sparkle Studio Salon, this is ${name}. I am interested in ${inquiry}. Please assist me.`;
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/918008385383?text=${encodedMessage}`;
    
    window.open(waLink, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setName('');
    setInquiry('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex fixed bottom-[96px] left-6 md:bottom-8 md:left-8 z-40 bg-gradient-to-tr from-charcoal-800 to-black border border-white/10 text-white p-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-110 hover:-translate-y-1 hover:border-[#25D366]/50 transition-all duration-300 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8">
           <defs>
              <linearGradient id="waGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1DA851">
                  <animate attributeName="stop-color" values="#1DA851;#25D366;#1DA851" dur="2s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#25D366">
                  <animate attributeName="stop-color" values="#25D366;#1DA851;#25D366" dur="2s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
           </defs>
          <path fill="url(#waGrad)" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[96px] right-2 md:bottom-24 md:left-8 md:right-auto z-50 w-[calc(100%-1rem)] max-w-[320px] rounded-2xl overflow-hidden glass-heavy shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10"
          >
            <div className="bg-[#25D366] text-white p-5 flex justify-between items-center w-full">
              <h3 className="font-sans font-bold text-sm tracking-widest uppercase">WhatsApp Us</h3>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 bg-charcoal-900/95 backdrop-blur-2xl flex flex-col gap-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 font-bold">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#25D366] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 font-bold">Service / Inquiry</label>
                <input 
                  type="text" 
                  required
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  placeholder="e.g. Bridal Package, Haircut"
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#25D366] transition-colors text-sm"
                />
              </div>
              <button 
                type="submit"
                className="w-full mt-2 bg-[#25D366] text-white py-3 rounded-lg font-bold tracking-[0.15em] uppercase text-[11px] hover:bg-[#1DA851] hover:shadow-[0_5px_15px_rgba(37,211,102,0.3)] transition-all"
               >
                Start Chat
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  const initialGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = 'Good Evening';
    if (hour < 12) timeGreeting = 'Good Morning';
    else if (hour < 18) timeGreeting = 'Good Afternoon';
    return `${timeGreeting}, Welcome to Glow Sparkle Studio ✨\nLet’s find the perfect service for you. What is your name?`;
  };

  const [messages, setMessages] = useState<{sender: 'bot'|'user', text: string, options?: string[]}[]>([
    { sender: 'bot', text: initialGreeting() }
  ]);
  const [inputState, setInputState] = useState<'name' | 'gender' | 'category' | 'time' | 'phone' | 'done'>('name');
  const [data, setData] = useState({ name: '', gender: '', category: '', time: '', phone: '' });
  const [inputText, setInputText] = useState('');
  const [showGreeting, setShowGreeting] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowGreeting(false);
    }
  }, [isOpen]);

  const handleSend = (text: string = inputText) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputText('');
    
    setTimeout(() => {
      if (inputState === 'name') {
        setData(prev => ({ ...prev, name: text }));
        setInputState('gender');
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `Lovely to meet you, ${text}. Please select your gender.`,
          options: ['Male', 'Female']
        }]);
      } else if (inputState === 'time') {
        setData(prev => ({ ...prev, time: text }));
        setInputState('phone');
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: 'Great. Please provide your phone number so we can confirm.'
        }]);
      } else if (inputState === 'phone') {
        const currentData = { ...data, phone: text };
        setData(currentData);
        setInputState('done');
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: 'Thank you! Your request has been recorded. Our team will reach out to you shortly to confirm your booking.'
        }]);
        
        // Trigger webhook
        try {
          const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbxZRhmXDZFU4HzrCg6r8jrNYsmnRkn4fRylQipdQBSX0sDmqZW9PqJI__TYi8bePNjv/exec";
          const params = new URLSearchParams();
          params.append("sheetName", "Chat Booking");
          params.append("Source", "Chat Widget");
          params.append("Name", currentData.name);
          params.append("Phone", currentData.phone);
          params.append("Details", `Gender: ${currentData.gender}, Category: ${currentData.category}, Time: ${currentData.time}`);
          
          fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString()
          }).catch(console.error);
        } catch (e) {
          console.error(e);
        }
      }
    }, 500);
  };

  const handleOptionClick = (option: string) => {
    setMessages(prev => [...prev, { sender: 'user', text: option }]);
    
    setTimeout(() => {
      if (inputState === 'gender') {
        setData(prev => ({ ...prev, gender: option }));
        setInputState('category');
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `Got it. What type of service are you looking for?`,
          options: ["Men's Grooming", "Women's Beauty", "Skin & Hair", "Bridal"]
        }]);
      } else if (inputState === 'category') {
         setData(prev => ({ ...prev, category: option }));
         setInputState('time');
         setMessages(prev => [...prev, { 
           sender: 'bot', 
           text: `Excellent choice. We have services starting at ₹800. When would you like to visit us? (e.g. Tomorrow at 5 PM)`
         }]);
      }
    }, 500);
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        id="chat-widget"
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex fixed bottom-[96px] right-6 md:bottom-8 md:right-8 z-40 bg-gradient-to-tr from-charcoal-800 to-black border border-brand-400/50 text-brand-400 p-4 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:scale-110 hover:-translate-y-1 hover:border-brand-300 transition-all duration-300 active:scale-95",
          isOpen ? "opacity-0 pointer-events-none scale-0" : "opacity-100 scale-100"
        )}
      >
        <svg width="0" height="0">
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37">
              <animate attributeName="stop-color" values="#D4AF37;#F6D365;#AA7C11;#D4AF37" dur="2s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stopColor="#F6D365">
              <animate attributeName="stop-color" values="#F6D365;#AA7C11;#D4AF37;#F6D365" dur="2s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>
        </svg>
        <MessageSquare size={30} stroke="url(#goldGrad)" className="fill-brand-400/20" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[96px] right-2 md:bottom-8 md:right-8 z-50 w-[calc(100%-1rem)] max-w-[380px] h-[600px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden glass-heavy shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10"
          >
            <div className="bg-gradient-to-r from-brand-600 to-brand-400 p-5 flex justify-between items-center shadow-md">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-brand-500 flex items-center justify-center font-serif font-bold text-xl shadow-inner">G</div>
                  <div>
                    <h3 className="font-serif text-white text-lg leading-none">Glow Sparkle Studio Concierge</h3>
                    <span className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Always Here</span>
                  </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-white hover:rotate-90 transition-transform">
                  <X size={22} />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 flex flex-col bg-charcoal-900/90 text-[13px]">
               {messages.map((msg, i) => (
                 <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={cn(
                      "max-w-[85%] rounded-2xl px-5 py-3 shadow-sm",
                      msg.sender === 'user' 
                        ? 'bg-brand-400 text-white rounded-tr-sm' 
                        : 'bg-white/10 border border-white/10 text-white/90 rounded-tl-sm backdrop-blur-md'
                    )}>
                      {msg.text.split('\n').map((line, j) => <p key={j} className={j > 0 ? "mt-1" : ""}>{line}</p>)}
                    </div>
                    {msg.options && msg.sender === 'bot' && (
                      <div className="flex flex-wrap gap-2 mt-3 w-full pl-2">
                        {msg.options.map((opt, j) => (
                           <button 
                             key={j} 
                             onClick={() => handleOptionClick(opt)}
                             className="text-[11px] uppercase font-bold tracking-widest text-brand-400 border border-brand-400/50 hover:bg-brand-400 hover:text-white px-4 py-2 rounded-full transition-all"
                           >
                             {opt}
                           </button>
                        ))}
                      </div>
                    )}
                 </div>
               ))}
               <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-charcoal-900 border-t border-white/10">
               {inputState !== 'gender' && inputState !== 'category' && inputState !== 'done' && (
                 <div className="flex gap-3 items-center relative">
                    <input 
                      type={inputState === 'phone' ? 'tel' : 'text'}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type your message..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3.5 text-sm focus:outline-none focus:border-brand-400/50 transition-colors text-white placeholder:text-white/30"
                    />
                    <button 
                      onClick={() => handleSend()}
                      disabled={!inputText.trim()}
                      className="w-12 h-12 rounded-full bg-brand-400 text-white flex flex-shrink-0 items-center justify-center disabled:opacity-50 disabled:bg-white/10 transition-all hover:bg-brand-500 hover:shadow-lg"
                    >
                      <Send size={18} className="translate-x-[1px]" />
                    </button>
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && showGreeting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            className="fixed bottom-[110px] right-[85px] md:bottom-[45px] md:right-[100px] z-40 bg-white text-charcoal-900 px-4 py-3 rounded-2xl rounded-br-sm shadow-[0_10px_30px_rgba(212,175,55,0.3)] max-w-[200px] sm:max-w-none cursor-pointer border border-brand-400/20"
            onClick={() => setIsOpen(true)}
          >
            <p className="text-[11px] font-bold leading-tight flex items-start gap-2">
              <span className="text-brand-500 shrink-0 mt-0.5">✨</span>
              <span>Hello, we're here to help you get glowing!</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col font-sans bg-charcoal-900 text-white selection:bg-brand-500/50 selection:text-white overflow-x-hidden w-full pb-16 lg:pb-0">
      <Navbar />
      
      <main className="flex-1 relative">
        <div key={location.pathname} className="w-full h-full">
          <Outlet />
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <ChatWidget />

      {/* Mobile Sticky CTA Bar */}
      <div 
        style={{ WebkitBackdropFilter: 'blur(32px)', backdropFilter: 'blur(32px)', backgroundColor: 'rgba(13, 13, 13, 0.8)' }}
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-white/10 grid grid-cols-2 h-16 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
      >
        <motion.a 
          whileTap={{ scale: 0.95 }}
          href="https://search.google.com/local/writereview?placeid=ChIJ_bi8CBFDOToRdeCICioy0ck" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-r border-white/10 text-[11px] uppercase tracking-widest font-bold text-white/80 active:text-white transition-colors"
        >
          <Star size={14} className="text-brand-400" fill="currentColor" />
          Review Us
        </motion.a>
        <Link 
          to="/book" 
          className="active:bg-brand-500 overflow-hidden"
        >
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-brand-400 text-white text-[11px] uppercase tracking-widest font-bold h-full w-full"
          >
            Book Now
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
