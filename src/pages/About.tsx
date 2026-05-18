import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-brand-400"></div>
            <h2 className="text-brand-400 text-sm tracking-[0.2em] uppercase font-bold">About Glow Sparkle Studio</h2>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
            A Legacy of <span className="text-brand-300 italic">Luxury</span>
          </h1>
          <div className="glass-heavy p-8 md:p-12 rounded-[2rem] border border-white/5 space-y-6">
            <p className="text-lg text-white/70 leading-relaxed font-light">
              Glow Sparkle Studio was born from a vision to redefine grooming and beauty in Visakhapatnam. We believe that true luxury is found in the details—from the moment you step through our doors to the lingering feeling of confidence after a transformative treatment.
            </p>
            <p className="text-lg text-white/70 leading-relaxed font-light">
              Our master stylists and therapists are continually trained in global techniques, ensuring that every service is an experience of unparalleled quality. We use only the finest products, carefully curated to protect and enhance your natural beauty.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
