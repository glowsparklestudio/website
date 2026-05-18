import { motion } from 'motion/react';
import { Scissors, Sparkles, Droplet, Star } from 'lucide-react';

const expertises = [
  {
    icon: <Scissors size={24} className="text-brand-400" />,
    title: "Precision Hair Styling",
    desc: "Our master stylists specialize in geometry-based cuts, bespoke coloring, and architectural styling tailored to your facial structure."
  },
  {
    icon: <Sparkles size={24} className="text-brand-400" />,
    title: "Advanced Skin Therapeutics",
    desc: "Integrating dermatological science with luxurious spa techniques for transformative, lasting skin radiance."
  },
  {
    icon: <Star size={24} className="text-brand-400" />,
    title: "Signature Bridal Makeup",
    desc: "HD and Airbrush techniques fused with an artistic eye to craft flawless, enduring bridal looks."
  },
  {
    icon: <Droplet size={24} className="text-brand-400" />,
    title: "Holistic Wellness",
    desc: "Deep tissue massage and revitalizing spa therapies designed to dissolve stress and harmonize mind and body."
  }
];

export default function ExpertisePage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-brand-400 text-sm tracking-[0.2em] uppercase font-bold mb-4">Our Expertise</h2>
          <h1 className="font-serif text-4xl md:text-6xl mb-6">Mastery in Every Discipline</h1>
          <p className="text-white/60 max-w-2xl mx-auto font-light">We combine technical excellence with artistic vision across every service category.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {expertises.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-heavy p-8 border border-white/5 hover:border-brand-400/30 transition-colors rounded-2xl group flex gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-serif mb-3 pt-1">{item.title}</h3>
                <p className="text-white/50 font-light text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
