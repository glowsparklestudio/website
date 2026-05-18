import { motion, AnimatePresence, useScroll } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Sparkles, Gem, ArrowUpRight, X } from 'lucide-react';
import { LiquidButton, getOptimizedImageUrl } from '../Layout';
import { useState, useEffect } from 'react';
import { cn } from '../Layout';
import { useAdmin } from '../contexts/AdminContext';
import SEO from '../components/SEO';

import { createPortal } from 'react-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const words = ["Luxury", "Elegance", "Perfection", "Brilliance"];

const carouselImages = [
  { title: "Hero Reception Section", url: "https://drive.google.com/thumbnail?id=1eSGJ7TM37f2nieLJI0QVuAZ6rHci3BGy&sz=w1000" },
  { title: "Facial & Treatment Lounge", url: "https://drive.google.com/thumbnail?id=1a-L6YYp5b-OmzMS8jQqegoVlK2sFaprX&sz=w1000" },
  { title: "Luxury Lounge Area", url: "https://drive.google.com/thumbnail?id=1uZcPT17KrStfZkoHSIYssm_POxzNI7zX&sz=w1000" },
  { title: "Makeup & Styling Lounge", url: "https://drive.google.com/thumbnail?id=1DIZ0zDHfRih6wdohDWcVCYy7394YJF2c&sz=w1000" },
  { title: "Pedicure Lounge Section", url: "https://drive.google.com/thumbnail?id=1fT248cSVMtne18xCoq-0Maw6dQmXrjdy&sz=w1000" },
  { title: "Premium Hair & Styling Studio", url: "https://drive.google.com/thumbnail?id=10pFIuPv9w7xkn1e81C0moYQU08HcJ7Gv&sz=w1000" }
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const [index, setIndex] = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const navigate = useNavigate();
  const { data } = useAdmin();
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    if (data.lightbox.isEnabled) {
      const timer = setTimeout(() => setShowLightbox(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [data.lightbox.isEnabled]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Load Instagram embed script if it hasn't been loaded
    if (!(window as any).instgrm) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.instagram.com/embed.js';
      script.onerror = () => {
        const fallbackScript = document.createElement('script');
        fallbackScript.src = 'https://iframely.net/files/instagram_embed.js';
        document.body.appendChild(fallbackScript);
      };
      document.body.appendChild(script);
    } else {
      (window as any).instgrm?.Embeds?.process();
    }
  }, []);

  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="w-full">
      <SEO 
        title="Glow Sparkle Studio | Premium Salon & Bridal Makeovers in Vizag"
        description="Ranked as the best salon in Vizag, Glow Sparkle Studio offers premium grooming, bridal makeovers, and expert hair & skin care. Book your appointment now!"
        keywords="best salon in vizag, premium salon visakhapatnam, bridal makeovers vizag, top hair salon in vizag, best beauty parlor vizag"
      />
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-300 to-brand-500 origin-left z-[200]"
      />
      {createPortal(
        <AnimatePresence>
          {showLightbox && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-lg w-full bg-charcoal-800 rounded-2xl overflow-hidden shadow-2xl border border-brand-400/30"
              >
                <button 
                  onClick={() => setShowLightbox(false)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-brand-400 hover:text-black transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="w-full relative bg-charcoal-900 border-b border-brand-400/20 flex items-center justify-center">
                  <img src={getOptimizedImageUrl(data.lightbox.imgUrl)} alt="Offer" className="w-full h-auto max-h-[50vh] object-contain" />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal-800 to-transparent pointer-events-none" />
                </div>
                <div className="p-6 md:p-8 text-center bg-charcoal-800">
                  <h3 className="font-serif text-xl md:text-2xl mb-3 md:mb-4 text-brand-400">Exclusive Offer</h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 whitespace-pre-wrap">{data.lightbox.offerDetails}</p>
                  <button 
                    onClick={() => {
                      setShowLightbox(false);
                      navigate('/book');
                    }}
                    className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-black bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 hover:from-brand-400 hover:via-brand-500 hover:to-brand-600 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                  >
                    Claim Offer Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Hero Section */}
      <section className="relative min-h-[100svh] lg:min-h-[100svh] flex items-center justify-start overflow-hidden pt-20 lg:pt-0 pb-20 lg:pb-0">
        {/* Background Image / Video Mock */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-[center_top]"
          style={{ backgroundImage: `url("${getOptimizedImageUrl('https://www.manyavar.com/on/demandware.static/-/Library-Sites-ManyavarSharedLibrary/default/dwac6643ec/Tips-and-Trick-for-Making-Your-Wedding-Makeup-Last-All-Day.jpg')}")` }}
        >
          {/* Overlay to darken and blur */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-900/90 to-charcoal-900/60 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Ambient gold glow */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-2xl py-12 lg:py-20"
          >
            <div className="inline-flex items-center justify-center mb-6 glass-heavy px-4 py-1.5 rounded-full border border-brand-400/30">
               <h2 className="text-white uppercase tracking-[0.3em] text-[10px] font-bold text-center">
                 Premium Unisex Salon, Vizag
               </h2>
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6 relative">
              Experience <br/> 
              <span className="relative inline-block h-[1.1em] w-[80%] align-top overflow-visible">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute left-0 italic font-light text-gradient-brand bg-clip-text text-transparent pb-4"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br/> Like Never Before
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-light max-w-xl mb-12 leading-relaxed">
              Step into a realm of sophisticated beauty and tailored elegance. 
              Discover premium grooming and flawless bridal transformations designed specifically for you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start lg:items-center gap-6">
              <Link to="/book">
                <LiquidButton className="bg-brand-400 text-white border-none w-full sm:w-auto text-sm px-10 py-4 uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:-translate-y-1">
                  Reserve Experience
                </LiquidButton>
              </Link>
              <button 
                onClick={() => document.getElementById('chat-widget')?.click()}
                className="group relative px-6 py-4 text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors flex items-center justify-center sm:justify-start gap-4"
              >
                <span>Consult an Expert</span>
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-400 group-hover:bg-brand-400/10 transition-all">
                  <ArrowUpRight size={16} className="text-brand-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="w-full flex lg:justify-end justify-center lg:pb-0"
          >
            <div className="w-full max-w-[340px] shadow-2xl rounded-[16px] overflow-hidden">
               <blockquote 
                 className="instagram-media" 
                 data-instgrm-permalink="https://www.instagram.com/reel/DYZXlEQg5YK/?utm_source=ig_embed&utm_campaign=loading" 
                 data-instgrm-version="14" 
                 style={{
                   background: '#000', 
                   border: '0', 
                   margin: '0', 
                   maxWidth: '100%', 
                   padding: '0',
                   width: '100%'
                 }}
               >
                  <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <a href="https://www.instagram.com/reel/DYZXlEQg5YK/?utm_source=ig_embed&utm_campaign=loading" style={{ background: 'transparent', textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} target="_blank" rel="noopener noreferrer">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ backgroundColor: '#ffffff20', borderRadius: '50%', height: '40px', width: '40px', marginBottom: '14px' }}></div>
                        <div style={{ color: '#fff', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontWeight: 550, lineHeight: '18px' }}>View on Instagram</div>
                      </div>
                    </a>
                  </div>
               </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <div className="relative group">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={carouselIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img 
                      src={getOptimizedImageUrl(carouselImages[carouselIdx].url)} 
                      alt={carouselImages[carouselIdx].title} 
                      className="w-full h-full object-cover md:hover:scale-105 transition-transform duration-1000"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Image Indicators */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col justify-end items-center gap-4 pointer-events-none">
                  <div className="flex gap-2 w-full justify-center">
                    {carouselImages.map((_, i) => (
                      <div key={i} className={cn("h-1 rounded-full transition-all duration-500", i === carouselIdx ? 'w-6 bg-brand-400' : 'w-2 bg-white/30')} />
                    ))}
                  </div>
                </div>
              </div>
              
            </div>
            
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-brand-400"></div>
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-brand-400">The Glow Sparkle Studio Elite</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 leading-[1.1]">
                Redefining the<br/>standard of elegance.
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6 font-light">
                At Glow Sparkle Studio, we believe that luxury is not just a service, it is an experience. Located in the heart of Visakhapatnam, our salon is a sanctuary designed for those who appreciate the finer things.
              </p>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 font-light">
                From bespoke hair treatments to immaculate bridal styling, our expert team uses only world-class products to deliver results that transcend expectations.
              </p>
              <Link to="/about" className="inline-flex items-center gap-4 text-white hover:text-brand-400 transition-colors group">
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-400 transition-colors">
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="uppercase tracking-[0.2em] text-xs font-bold">Discover Our Story</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 md:py-28 px-6 bg-charcoal-800/20 border-y border-white/5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-brand-400"></div>
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-brand-400">Curated Catalogue</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl max-w-xl">Signature Services</h2>
            </div>
            <Link to="/services">
              <LiquidButton className="hidden md:inline-flex bg-transparent border-white/20 hover:border-brand-400 hover:bg-brand-400/10 text-xs px-8 tracking-widest uppercase">
                Explore Full Directory
              </LiquidButton>
            </Link>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
          >
            {[
              { title: "Advanced Skin Therapy", desc: "Rejuvenating O3+ facials, cryotherapy, and deep pigmentation treatments using marine extracts.", img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2670&auto=format&fit=crop" },
              { title: "Bespoke Hair Styling", desc: "Precision cuts, premium Botox treatments, keratin smoothing, and ammonia-free vibrant coloring.", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2669&auto=format&fit=crop" },
              { title: "Men's Classic Grooming", desc: "Tailored beard architecture, classic cuts, and revitalizing dandruff & spa treatments.", img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2576&auto=format&fit=crop" }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                variants={fadeIn} 
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCard(activeCard === i ? null : i)}
                className={cn(
                  "group cursor-pointer relative rounded-2xl overflow-hidden p-[2px] shadow-2xl transition-transform md:hover:-translate-y-2 duration-500",
                  activeCard === i && "-translate-y-2"
                )}
              >
                {/* Tapered outlined animated gradient border */}
                <div className={cn(
                  "absolute inset-0 bg-charcoal-800 transition-colors duration-500 z-0",
                  activeCard === i && "bg-transparent"
                )}></div>
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-700 bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#D4AF37_50%,#000000_100%)] animate-[spin_4s_linear_infinite] z-0 delay-100",
                  activeCard === i && "opacity-100"
                )} />
                
                <div className="relative overflow-hidden aspect-[4/5] rounded-[14px] z-10">
                  <div className={cn(
                    "absolute inset-0 bg-charcoal-900/40 group-hover:bg-transparent group-active:bg-transparent transition-colors duration-700 z-10",
                    activeCard === i && "bg-transparent"
                  )}></div>
                  <img 
                    src={getOptimizedImageUrl(service.img)} 
                    alt={service.title} 
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-active:scale-110",
                      activeCard === i && "scale-110"
                    )}
                  />
                  <div className={cn(
                    "absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-charcoal-900 via-charcoal-900/90 to-transparent z-20 translate-y-8 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500",
                    activeCard === i && "translate-y-0"
                  )}>
                    <h3 className={cn(
                      "font-serif text-3xl mb-3 text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] group-active:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all delay-100",
                      activeCard === i && "drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    )}>{service.title}</h3>
                    <p className={cn(
                      "text-white font-light text-sm leading-relaxed opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto group-active:h-auto drop-shadow-md",
                      activeCard === i && "opacity-100 h-auto"
                    )}>
                      {service.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12 md:hidden">
            <Link to="/services">
              <LiquidButton className="w-full text-xs tracking-widest uppercase">Explore Full Directory</LiquidButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Bridal & Groom Editions Side-by-Side */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center gap-8">
          
          {/* Bridal Highlight */}
          <div className="w-full lg:w-1/2 relative rounded-[2rem] overflow-hidden group min-h-[60vh] flex flex-col items-start justify-end px-8 md:px-12 py-16">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-[center_top] group-hover:scale-110 transition-transform duration-[2s] ease-in-out"
              style={{ backgroundImage: `url("${getOptimizedImageUrl('https://images.unsplash.com/photo-1594124376326-faee904cc973?q=80&w=1600&auto=format&fit=crop')}")` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/60 to-charcoal-900/20 z-0"></div>
            
            <div className="relative z-10 w-full">
              <div className="inline-flex px-3 py-1 rounded-full border border-brand-400/30 text-brand-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 bg-black/30 backdrop-blur-md">
                The Bridal Edit
              </div>
              <h3 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">Flawless beauty <br/>for your perfect day.</h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-md font-light">
                Our bespoke bridal packages are curated to ensure you look and feel extraordinary. From premium HD makeup to intricate styling, we orchestrate perfection.
              </p>
              <div className="flex gap-4">
                <Link to="/bridal">
                  <LiquidButton className="bg-brand-400 text-white hover:bg-brand-500 border-none px-6 py-3 uppercase tracking-widest text-[10px] font-bold">
                    View Packages
                  </LiquidButton>
                </Link>
                <button 
                  onClick={() => document.getElementById('chat-widget')?.click()}
                  className="glass hover:bg-white/20 text-white px-6 py-3 uppercase tracking-widest text-[10px] font-bold rounded-full transition-colors border border-white/20"
                >
                  Consult Now
                </button>
              </div>
            </div>
          </div>

          {/* Groom Highlight */}
          <div className="w-full lg:w-1/2 relative rounded-[2rem] overflow-hidden group min-h-[60vh] flex flex-col items-start justify-end px-8 md:px-12 py-16">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-[center_top] group-hover:scale-110 transition-transform duration-[2s] ease-in-out"
              style={{ backgroundImage: `url("${getOptimizedImageUrl('https://images.unsplash.com/photo-1614275213600-672521c7e97d?q=80&w=1600&auto=format&fit=crop')}")` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/60 to-charcoal-900/20 z-0"></div>
            
            <div className="relative z-10 w-full">
              <div className="inline-flex px-3 py-1 rounded-full border border-brand-400/30 text-brand-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 bg-black/30 backdrop-blur-md">
                The Groom Edit
              </div>
              <h3 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">Classic grooming <br/>for the modern gentleman.</h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-md font-light">
                Elevate your wedding day look with tailored grooming, precise beard styling, and revitalizing therapies explicitly designed for the discerning groom.
              </p>
              <div className="flex gap-4">
                <Link to="/services">
                  <LiquidButton className="bg-brand-400 text-white hover:bg-brand-500 border-none px-6 py-3 uppercase tracking-widest text-[10px] font-bold">
                    Groom Services
                  </LiquidButton>
                </Link>
                <button 
                  onClick={() => document.getElementById('chat-widget')?.click()}
                  className="glass hover:bg-white/20 text-white px-6 py-3 uppercase tracking-widest text-[10px] font-bold rounded-full transition-colors border border-white/20"
                >
                  Consult Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Client Experiences</h2>
            <div className="w-12 h-[1px] bg-brand-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Priya S.", text: "Absolutely stunning service. The premium bridal package was worth every penny, I felt like absolute royalty on my wedding day. The staff is incredible." },
              { name: "Arjun R.", text: "Best men's grooming in Vizag. Period. The attention to detail during the beard styling and the ambiance are completely unmatched." },
              { name: "Neha K.", text: "The O3+ whitening facial completely transformed my skin. The estheticians are incredibly knowledgeable and made me feel so relaxed." }
            ].map((review, i) => (
              <div key={i} className="glass group p-10 rounded-2xl hover:-translate-y-2 hover:bg-brand-400/5 hover:border-brand-400/30 transition-all duration-500 relative">
                {/* Decorative quotes */}
                <div className="absolute top-6 right-8 text-6xl text-white/5 font-serif group-hover:text-brand-400/10 transition-colors">"</div>
                
                <div className="flex text-brand-400 mb-8 gap-1">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-white/80 font-light text-base leading-relaxed mb-10 relative z-10">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center text-brand-400 font-serif text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest font-bold text-white">{review.name}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Verified Client</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden bg-charcoal-800/10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-brand-600/10 blur-[150px] rounded-t-[100%] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 glass-heavy px-6 py-12 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-brand-400/10 shadow-2xl mx-4 md:mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-6 md:mb-8 leading-tight">Ready for your <br/><span className="text-gradient-brand">transformation?</span></h2>
          <p className="text-white/60 mb-8 md:mb-12 text-base md:text-lg max-w-xl mx-auto">Secure your appointment today and step into luxury. Our specialists await to craft your perfect look.</p>
          <Link to="/book">
            <LiquidButton className="bg-brand-400 text-white hover:bg-brand-500 border-transparent shadow-[0_10px_40px_rgba(212,175,55,0.4)] text-[12px] md:text-[13px] px-8 md:px-12 py-4 md:py-5 uppercase tracking-[0.2em] font-bold w-full sm:w-auto">
              Reserve Your Time
            </LiquidButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
