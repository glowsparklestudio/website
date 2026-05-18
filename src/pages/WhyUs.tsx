import { motion } from 'motion/react';
import { Shield, Heart, Award, Clock } from 'lucide-react';

const reasons = [
  {
    icon: <Shield size={24} className="text-brand-400" />,
    title: "Uncompromising Hygiene",
    desc: "Hospital-grade sterilization protocols for all tools, disposable implements where necessary, and spotless environments."
  },
  {
    icon: <Heart size={24} className="text-brand-400" />,
    title: "Premium Products",
    desc: "We exclusively partner with global luxury brands like L'Oréal Professionnel, Schwarzkopf, and Kérastase for superior results without compromise."
  },
  {
    icon: <Award size={24} className="text-brand-400" />,
    title: "Award-Winning Artists",
    desc: "Our team consists of industry veterans and award-winning stylists passionate about their craft and your satisfaction."
  },
  {
    icon: <Clock size={24} className="text-brand-400" />,
    title: "Respect for Your Time",
    desc: "Punctual appointments, efficient service flow, and a serene atmosphere that makes every minute feel like a luxurious escape."
  }
];

export default function WhyUsPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-brand-400"></div>
            <h2 className="text-brand-400 text-sm tracking-[0.2em] uppercase font-bold">The Glow Sparkle Studio Standard</h2>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl mb-12 leading-tight">
            Why Choose Us
          </h1>
          
          <div className="space-y-8">
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col md:flex-row gap-6 items-start md:items-center glass-heavy p-8 rounded-2xl border border-white/5"
              >
                <div className="w-16 h-16 rounded-full bg-brand-400/10 flex items-center justify-center shrink-0">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-2">{reason.title}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
