const fs = require('fs');
let code = fs.readFileSync('src/pages/Services.tsx', 'utf8');

const t = `                           {(searchQuery.trim() !== "" || expandedCategories.includes(sub.displayName || sub.name)) && (
                             <motion.div
                               initial={{ opacity: 0, height: 0 }}
                               animate={{ opacity: 1, height: "auto" }}
                               exit={{ opacity: 0, height: 0 }}
                               className="overflow-hidden relative"
                             >
                           <p className="text-sm font-light text-white/40 mb-8 pb-6 border-b border-white/5">{sub.desc}</p>
                           
                           <div className="flex flex-col gap-4">
                              {sub.items.map((item: any, j: number) => (
                                 <div key={j} className="flex justify-between items-center gap-3 py-4 border-b border-white/10 last:border-0 group/item">
                                    <div className="flex flex-col gap-1.5 flex-1 min-w-0 pr-2">
                                       {item.premium && (
                                         <div className="flex items-center gap-1 text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded w-fit mb-1">
                                           <Sparkles size={8} />
                                           <span className="text-[9px] uppercase tracking-widest font-bold">Recommended</span>
                                         </div>
                                       )}
                                       <h4 className={cn("text-[15px] md:text-base font-light leading-snug truncate whitespace-normal transition-colors group-hover/item:text-brand-300", item.premium ? "text-white" : "text-white/80")}>
                                          {item.name}
                                       </h4>
                                       <span className={cn("text-sm font-medium transition-colors group-hover/item:text-brand-300", item.premium ? "text-[#D4AF37]" : "text-white/60")}>
                                          {item.price}
                                       </span>
                                    </div>
                                    
                                    <div className="shrink-0">
                                       <button 
                                         onClick={(e) => { e.stopPropagation(); toggleService(item.name, item.price); }}
                                         className={cn(
                                           "min-w-[76px] h-9 px-3 rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border active:scale-95 shadow-[0_4px_10px_rgba(0,0,0,0.2)]",
                                           isSelected(item.name) 
                                              ? "bg-brand-400 border-transparent text-white shadow-[0_0_15px_rgba(183,28,28,0.3)]" 
                                              : "border-white/10 text-white bg-white/5 hover:border-brand-400 hover:text-brand-400 hover:bg-brand-400/10"
                                         )}
                                       >
                                         {isSelected(item.name) ? 'Added' : 'Add +'}
                                       </button>
                                    </div>
                                 </div>
                              ))}
                           </div>
                              </motion.div>
                            )}`;

const r = `                           <AnimatePresence initial={false}>
                             {(searchQuery.trim() !== "" || expandedCategories.includes(sub.displayName || sub.name)) && (
                               <motion.div
                                 initial={{ opacity: 0, height: 0 }}
                                 animate={{ opacity: 1, height: "auto" }}
                                 exit={{ opacity: 0, height: 0 }}
                                 transition={{ duration: 0.3, ease: "easeInOut" }}
                                 className="overflow-hidden relative"
                               >
                                 <div className="pt-2">
                                   <p className="text-sm font-light text-white/40 mb-8 pb-6 border-b border-white/5">{sub.desc}</p>
                                   
                                   <div className="flex flex-col gap-4">
                                      {sub.items.map((item: any, j: number) => (
                                         <div key={j} className="flex justify-between items-center gap-3 py-4 border-b border-white/10 last:border-0 group/item">
                                            <div className="flex flex-col gap-1.5 flex-1 min-w-0 pr-2">
                                               {item.premium && (
                                                 <div className="flex items-center gap-1 text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded w-fit mb-1">
                                                   <Sparkles size={8} />
                                                   <span className="text-[9px] uppercase tracking-widest font-bold">Recommended</span>
                                                 </div>
                                               )}
                                               <h4 className={cn("text-[15px] md:text-base font-light leading-snug truncate whitespace-normal transition-colors group-hover/item:text-brand-300", item.premium ? "text-white" : "text-white/80")}>
                                                  {item.name}
                                               </h4>
                                               <span className={cn("text-sm font-medium transition-colors group-hover/item:text-brand-300", item.premium ? "text-[#D4AF37]" : "text-white/60")}>
                                                  {item.price}
                                               </span>
                                            </div>
                                            
                                            <div className="shrink-0">
                                               <button 
                                                 onClick={(e) => { e.stopPropagation(); toggleService(item.name, item.price); }}
                                                 className={cn(
                                                   "min-w-[76px] h-9 px-3 rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border active:scale-95 shadow-[0_4px_10px_rgba(0,0,0,0.2)]",
                                                   isSelected(item.name) 
                                                      ? "bg-brand-400 border-transparent text-white shadow-[0_0_15px_rgba(183,28,28,0.3)]" 
                                                      : "border-white/10 text-white bg-white/5 hover:border-brand-400 hover:text-brand-400 hover:bg-brand-400/10"
                                                 )}
                                               >
                                                 {isSelected(item.name) ? 'Added' : 'Add +'}
                                               </button>
                                            </div>
                                         </div>
                                      ))}
                                   </div>
                                 </div>
                               </motion.div>
                             )}
                           </AnimatePresence>`;

code = code.replace(t, r);
fs.writeFileSync('src/pages/Services.tsx', code);
console.log("Replaced!");
