import { motion } from 'motion/react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { LiquidButton } from '../Layout';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl mb-6"
          >
            Get in Touch
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
            className="text-white/70 max-w-2xl mx-auto font-light text-lg"
          >
            We look forward to welcoming you to our sanctuary of elegance.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 lg:col-span-2 relative"
          >
            <div className="flex gap-6 items-start group glass-heavy p-8 rounded-2xl hover:border-brand-400/30 transition-all border border-white/5">
              <div className="w-14 h-14 rounded-full border border-brand-400/30 flex items-center justify-center shrink-0 text-brand-400 bg-brand-400/5 group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2 text-white">Our Location</h3>
                <p className="text-white/60 font-light leading-relaxed">
                  3rd Floor, Above River bike showroom,<br/>
                  Visakha Eye Hospital Road,<br/>
                  beside Satyam Super Market, Nauka Nagar,<br/>
                  Polamambatemple beside, Visakhapatnam
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group glass-heavy p-8 rounded-2xl hover:border-brand-400/30 transition-all border border-white/5">
              <div className="w-14 h-14 rounded-full border border-brand-400/30 flex items-center justify-center shrink-0 text-brand-400 bg-brand-400/5 group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2 text-white">Contact</h3>
                <p className="text-white/60 font-light mb-4">Direct Line: <br/><a href="tel:8008385383" className="text-brand-400 hover:text-brand-300 transition-colors">800 838 5383</a> <br/><a href="tel:8008380282" className="text-brand-400 hover:text-brand-300 transition-colors">800 838 0282</a></p>
                <div onClick={() => document.getElementById('chat-widget')?.click()}>
                   <LiquidButton className="px-6 py-2 text-xs uppercase tracking-widest bg-white/5 border-brand-400/30 hover:border-brand-400 hover:bg-brand-400/10">Consult an Expert</LiquidButton>
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-start group glass-heavy p-8 rounded-2xl hover:border-brand-400/30 transition-all border border-white/5">
              <div className="w-14 h-14 rounded-full border border-brand-400/30 flex items-center justify-center shrink-0 text-brand-400 bg-brand-400/5 group-hover:scale-110 transition-transform">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2 text-white">Hours</h3>
                <p className="text-white/60 font-light">
                  Monday - Sunday<br/>
                  <span className="text-white">10:00 AM - 9:00 PM</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[600px] w-full rounded-2xl overflow-hidden glass p-2 lg:col-span-3 border border-brand-400/20 shadow-2xl"
          >
            {/* Map styling using Google Maps embed */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.2866996230473!2d83.32822967482515!3d17.731125383215836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431108bcb8fd%3A0xc9d1322a0a88e075!2sGlow%20Sparkle%20Studio%20(unisex%20salon)!5e0!3m2!1sen!2sin!4v1778062140448!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl bg-charcoal-900"
              title="Glow Sparkle Studio Salon Location"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
