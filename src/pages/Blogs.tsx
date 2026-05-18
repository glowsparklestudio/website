import { motion, AnimatePresence } from 'motion/react';
import { useAdmin } from '../contexts/AdminContext';
import { useState } from 'react';
import { X, Calendar, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import { getOptimizedImageUrl } from '../Layout';

export default function BlogsPage() {
  const { data } = useAdmin();
  const blogs = data.blogs || [];
  
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <SEO 
        title="Beauty & Bridal Blogs | Glow Sparkle Studio"
        description="Read our latest insights, tips, and trends on beauty, grooming, pre-bridal skincare, and bridal makeup. Stay glowing with our expert advice."
        keywords="bridal makeup tips, skin care routines, glowing skin diet, nanoplastia vizag, beauty blog, glow sparkle studio blog"
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl mb-6 text-brand-400"
          >
            Insights & Trends
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
            Expert advice, treatment deep-dives, and the latest beauty trends from the professionals at Glow Sparkle Studio.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.2 }}
              onClick={() => setSelectedBlog(blog)}
              className="group cursor-pointer rounded-2xl overflow-hidden glass-heavy flex flex-col h-full hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={getOptimizedImageUrl(blog.image)} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent opacity-80" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-brand-400 mb-3 tracking-widest uppercase">
                  <Calendar size={12} />
                  {blog.date}
                </div>
                <h3 className="font-serif text-2xl mb-3 group-hover:text-brand-400 transition-colors">{blog.title}</h3>
                <p className="text-white/60 mb-6 flex-grow">{blog.excerpt}</p>
                <div className="flex items-center gap-2 text-brand-400 text-sm font-bold tracking-widest uppercase mt-auto">
                  Read Article <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Blog Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal-900/90 backdrop-blur-xl"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-charcoal-800 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 z-10 bg-charcoal-900/50 hover:bg-brand-400 backdrop-blur-md p-2 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="w-full h-64 md:h-80 relative shrink-0">
                <img src={getOptimizedImageUrl(selectedBlog.image)} alt={selectedBlog.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800 to-transparent" />
              </div>

              <div className="p-8 md:p-10 overflow-y-auto">
                <div className="flex items-center gap-2 text-sm text-brand-400 mb-4 tracking-widest uppercase">
                  <Calendar size={14} />
                  {selectedBlog.date}
                </div>
                <h2 className="font-serif text-3xl md:text-5xl mb-6 text-white">{selectedBlog.title}</h2>
                <div className="w-12 h-1 bg-brand-400 mb-8"></div>
                <div className="prose prose-invert prose-brand max-w-none">
                  {selectedBlog.content.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="text-white/80 leading-relaxed text-lg mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
