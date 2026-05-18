import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Settings, Image as ImageIcon, Video, Gift, Save, LogOut, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getOptimizedImageUrl } from '../Layout';

export default function AdminPage() {
  const { data, updateData, isAuthenticated, login, logout } = useAdmin();
  
  const [activeTab, setActiveTab] = useState<'blogs' | 'youtube' | 'lightbox' | 'menu'>('blogs');

  // Form states
  const [blogsJson, setBlogsJson] = useState(JSON.stringify(data.blogs || [], null, 2));
  const [youtubeVideos, setYoutubeVideos] = useState(data.youtubeVideos.join('\n'));
  const [lightbox, setLightbox] = useState(data.lightbox);
  const [menuJson, setMenuJson] = useState(JSON.stringify(data.serviceMenu || [], null, 2));
  const [message, setMessage] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center p-4">
        <div className="bg-charcoal-800 p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl">
          <h1 className="text-3xl font-serif text-brand-400 mb-6 text-center">Admin Portal</h1>
            <div className="space-y-4">
              {message && <p className="text-red-400 text-sm">{message}</p>}
              <button 
                onClick={async () => {
                  const res = await login();
                  if (!res.success) {
                    setMessage(res.message || "Unauthorized.");
                  }
                }}
                className="w-full bg-brand-400 text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-brand-500 transition-colors flex items-center justify-center gap-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                   <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Sign In with Google
              </button>
            </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    try {
      const parsedMenu = JSON.parse(menuJson);
      const parsedBlogs = JSON.parse(blogsJson);
      updateData({
        blogs: parsedBlogs,
        youtubeVideos: youtubeVideos.split('\n').map(s => s.trim()).filter(Boolean),
        lightbox,
        serviceMenu: parsedMenu
      });
      setMessage('Settings saved successfully!');
    } catch (e) {
      setMessage('Error: Invalid JSON format in Service Menu or Blogs.');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-brand-400 flex items-center gap-3">
            <Settings /> Glow Sparkle Admin
          </h1>
          <button onClick={logout} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="grid md:grid-cols-[200px_1fr] gap-8">
          <div className="space-y-2">
            {[
              { id: 'blogs', icon: <FileText size={18}/>, label: 'Blogs' },
              { id: 'youtube', icon: <Video size={18}/>, label: 'Videos' },
              { id: 'lightbox', icon: <Gift size={18}/>, label: 'Lightbox Offer' },
              { id: 'menu', icon: <FileText size={18}/>, label: 'Service Menu' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === tab.id ? 'bg-brand-400/20 text-brand-400 border border-brand-400/30' : 'text-white/60 hover:bg-white/5'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-charcoal-800 p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {activeTab === 'blogs' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Blogs (JSON)</h2>
                    <p className="text-white/50 text-sm mb-4">Edit the raw JSON structure of the blogs. Note: It requires {"[{ id, title, excerpt, content, image, date }]"} structure.</p>
                    <textarea 
                      value={blogsJson}
                      onChange={e => setBlogsJson(e.target.value)}
                      className="w-full h-[500px] bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-400 font-mono text-xs whitespace-pre mb-6"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(() => {
                           try {
                             const parsed = JSON.parse(blogsJson);
                             if (!Array.isArray(parsed)) return null;
                             return parsed.map((b: any, idx: number) => (
                               <div key={idx} className="space-y-1">
                                 <div className="aspect-video rounded bg-black/30 border border-white/10 overflow-hidden">
                                   <img src={getOptimizedImageUrl(b.image)} alt="" className="w-full h-full object-cover" />
                                 </div>
                                 <p className="text-[10px] truncate text-white/40">{b.title || 'Untitled'}</p>
                               </div>
                             ));
                           } catch(e) { return null; }
                        })()}
                    </div>
                  </div>
                )}

                {activeTab === 'youtube' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Embedded YouTube Videos</h2>
                    <p className="text-white/50 text-sm mb-4">Enter YouTube embed URLs (one per line). E.g. https://www.youtube.com/embed/XXXXX</p>
                    <textarea 
                      value={youtubeVideos}
                      onChange={e => setYoutubeVideos(e.target.value)}
                      className="w-full h-64 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-400 font-mono text-sm"
                    />
                  </div>
                )}

                {activeTab === 'lightbox' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">Promotional Lightbox Popup</h2>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={lightbox.isEnabled}
                        onChange={e => setLightbox({...lightbox, isEnabled: e.target.checked})}
                        className="w-5 h-5 accent-brand-400"
                      />
                      <span>Enable Lightbox Popup on Home Page</span>
                    </label>

                    <div className="flex gap-4 items-start">
                      <div className="flex-grow">
                        <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-bold">Image URL (Google Drive / Direct Link)</label>
                        <input 
                          type="text" 
                          value={lightbox.imgUrl}
                          onChange={e => setLightbox({...lightbox, imgUrl: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand-400"
                        />
                      </div>
                      {lightbox.imgUrl && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black/30">
                          <img src={getOptimizedImageUrl(lightbox.imgUrl)} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-bold">Offer Details Text</label>
                      <textarea 
                        value={lightbox.offerDetails}
                        onChange={e => setLightbox({...lightbox, offerDetails: e.target.value})}
                        className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-400"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'menu' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Service Menu (JSON)</h2>
                    <p className="text-white/50 text-sm mb-4">Edit the raw JSON structure of the service menu. Be careful not to break the format. Note: It requires {"{ id, title, icon, subcategories: [{ name, desc, items: [{ name, price, premium? }] }] }"} structure.</p>
                    <textarea 
                      value={menuJson}
                      onChange={e => setMenuJson(e.target.value)}
                      className="w-full h-[500px] bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-400 font-mono text-xs whitespace-pre"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-brand-400 text-sm">{message}</span>
              <button 
                onClick={handleSave}
                className="bg-brand-400 text-black font-bold uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-brand-500 transition-colors flex items-center gap-2"
              >
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
