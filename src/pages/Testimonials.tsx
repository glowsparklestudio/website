import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sanghi",
    role: "Regular Client",
    content: "Glow Sparkle Studio isn't just a salon, it's an experience. The attention to detail, from the ambient lighting to the personalized consultation, is unmatched in Vizag. My hair has never looked or felt better.",
    rating: 5
  },
  {
    name: "Ananya Reddy",
    role: "Bridal Client",
    content: "I booked their Premium Signature Bridal package and it was the best decision for my wedding day. The makeup was flawless, stayed perfectly through the night, and looked stunning in photos. Thank you to the entire team!",
    rating: 5
  },
  {
    name: "Rohan Varma",
    role: "Regular Client",
    content: "Excellent men's grooming services. Professional, hygienic, and very skilled staff. The head massage after a haircut is exactly what I need after a long work week.",
    rating: 5
  },
  {
    name: "Neha Sharma",
    role: "Spa Client",
    content: "The skin therapeutics here are a game-changer. My esthetician was so knowledgeable and tailored the entire treatment to my sensitive skin needs. Highly recommend the holistic wellness services.",
    rating: 5
  }
];

export default function TestimonialsPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-brand-400"></div>
            <h2 className="text-brand-400 text-sm tracking-[0.2em] uppercase font-bold">Client Stories</h2>
            <div className="h-[1px] w-8 bg-brand-400"></div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-6">Words of Praise</h1>
          <p className="text-white/60 max-w-2xl mx-auto font-light">Don't just take our word for it. Hear what our cherished clients have to say about their Glow Sparkle Studio experience.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-heavy p-8 border border-white/5 rounded-2xl relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-brand-400 fill-brand-400" />
                ))}
              </div>
              <p className="text-lg text-white/80 font-light leading-relaxed mb-8 italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-400/20 flex flex-col items-center justify-center text-brand-400 font-serif text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-xs text-white/40 uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
