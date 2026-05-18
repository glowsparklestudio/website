import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Gift, Instagram, Trophy, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function ContestPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', instagram: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbxZRhmXDZFU4HzrCg6r8jrNYsmnRkn4fRylQipdQBSX0sDmqZW9PqJI__TYi8bePNjv/exec";
      if (scriptUrl) {
           const params = new URLSearchParams();
           params.append("sheetName", "Contest");
           params.append("Source", "Contest");
           params.append("Name", formData.name);
           params.append("Phone", formData.phone);
           params.append("Instagram", formData.instagram);

           await fetch(scriptUrl, {
               method: 'POST',
               mode: 'no-cors',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: params.toString()
           });
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-6 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* Contest Info */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 bg-charcoal-800 border border-brand-400/30 shadow-[0_0_15px_rgba(212,175,55,0.2)] text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] mb-8 font-bold">
            <Sparkles size={14} className="text-brand-400" />
            MONTHLY CONTEST
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.1] tracking-tight">
            Glow Sparkle <br/><span className="text-brand-400">Monthly</span> Contest
          </h1>
          <p className="text-white/60 text-base md:text-lg font-light mb-12 leading-relaxed max-w-xl">
            Every month brings a new beauty challenge, makeover opportunity, or exclusive salon reward. Participate now and follow our Instagram page to stay updated with upcoming contests, surprise campaigns, and winner announcements.
          </p>

          <div className="space-y-10 mb-12">
            <div className="flex gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-charcoal-800 border border-brand-400/20 flex items-center justify-center shrink-0 text-brand-400 group-hover:bg-brand-400/10 group-hover:border-brand-400/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500">
                <Gift size={24} />
              </div>
              <div>
                <h3 className="font-sans font-bold uppercase tracking-widest text-sm mb-3">What You Can Win</h3>
                <ul className="text-white/60 font-light text-[15px] space-y-1.5 list-disc list-inside">
                  <li>Free grooming sessions</li>
                  <li>Hair spa & skincare packages</li>
                  <li>Premium makeover experiences</li>
                  <li>Exclusive salon vouchers</li>
                  <li>Seasonal surprise gifts</li>
                </ul>
                <p className="text-brand-400/80 text-xs italic mt-3">Rewards and contest themes change every month.</p>
              </div>
            </div>
            
            <div className="flex gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-charcoal-800 border border-brand-400/20 flex items-center justify-center shrink-0 text-brand-400 group-hover:bg-brand-400/10 group-hover:border-brand-400/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500">
                <Trophy size={24} />
              </div>
              <div>
                <h3 className="font-sans font-bold uppercase tracking-widest text-sm mb-3">How to Participate</h3>
                <ol className="text-white/60 font-light text-[15px] space-y-2 list-decimal list-inside">
                  <li>Follow @glowsparklestudiovizag on Instagram</li>
                  <li>Check the latest contest post for this month’s rules</li>
                  <li>Fill out the participation form</li>
                  <li>Stay active for winner announcements and surprise rewards</li>
                </ol>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-charcoal-800 border border-brand-400/20 flex items-center justify-center shrink-0 text-brand-400 group-hover:bg-brand-400/10 group-hover:border-brand-400/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500">
                <Instagram size={24} />
              </div>
              <div>
                <h3 className="font-sans font-bold uppercase tracking-widest text-sm mb-3">Winner Announcement</h3>
                <p className="text-white/60 font-light text-[15px] leading-relaxed">
                  Winners will be announced through our Instagram stories, posts, and live sessions. Follow our page for updates on new contests and salon campaigns.
                </p>
                <a href="https://www.instagram.com/glowsparklestudiovizag/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-brand-400 text-sm font-bold tracking-widest uppercase hover:text-brand-300 transition-colors bg-brand-400/10 border border-brand-400/30 px-4 py-2 rounded-lg hover:bg-brand-400/20 hover:shadow-[0_5px_15px_rgba(212,175,55,0.2)]">
                  <Instagram size={16} />
                  Follow Instagram
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Participation Form */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="lg:col-span-5 sticky top-24"
        >
          <div className="bg-gradient-to-br from-charcoal-800/90 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            {/* Soft border glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-400/0 to-brand-400/0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-1000" />
            
            {submitted ? (
              <div className="text-center py-16 relative z-10">
                 <div className="w-24 h-24 bg-brand-400/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-400/40 shadow-[0_0_30px_rgba(212,175,55,0.2)] relative">
                    <Check size={40} className="text-brand-400" />
                 </div>
                 <h3 className="font-serif text-3xl text-white mb-4">Entry Received</h3>
                 <p className="text-white/60 font-light leading-relaxed">Thank you for participating! Make sure you completed the Instagram steps.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <h3 className="font-sans font-bold text-2xl mb-8 tracking-tight text-white flex items-center gap-3">
                  <Sparkles size={24} className="text-brand-400" />
                  Join the Contest
                </h3>
                
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-400 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300"
                    placeholder="Your complete name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-400 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Instagram Username</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">@</span>
                    <input 
                      type="text" 
                      required
                      placeholder="username"
                      value={formData.instagram}
                      onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white focus:outline-none focus:border-brand-400 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 hover:from-brand-400 hover:via-brand-500 hover:to-brand-600 text-black border-none font-bold uppercase tracking-[0.2em] text-sm py-5 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {isSubmitting ? "Submitting..." : "Participate Now"}
                    {!isSubmitting && <ArrowRight size={18} />}
                  </button>
                </div>
                <p className="text-center text-[11px] text-white/40 mt-6 leading-relaxed">
                  New contests every month — follow us on Instagram for updates.
                </p>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
