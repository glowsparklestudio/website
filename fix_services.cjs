const fs = require('fs');
let code = fs.readFileSync('src/pages/Services.tsx', 'utf8');

const target1 = `                           <h3 className="font-serif text-3xl mb-2 group-hover:text-brand-400 pointer-events-none">
                             {sub.displayName || sub.name}
                           </h3>
                           <p className="text-sm font-light text-white/40 mb-8 pb-6 border-b border-white/5">{sub.desc}</p>
                           
                           <div className="flex flex-col gap-4">
                              {sub.items.map((item: any, j: number) => (`

const replace1 = `                           <div className={cn("flex items-center justify-between gap-4 cursor-pointer", (searchQuery.trim() !== "" || expandedCategories.includes(sub.displayName || sub.name)) && "mb-2")}>
                              <h3 className="font-serif text-3xl group-hover:text-brand-400 transition-colors pointer-events-none">
                                {sub.displayName || sub.name}
                              </h3>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedCategories(prev => 
                                    (searchQuery.trim() !== "" || expandedCategories.includes(sub.displayName || sub.name)) 
                                      ? prev.filter(id => id !== (sub.displayName || sub.name))
                                      : [...prev, sub.displayName || sub.name]
                                  );
                                }}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0 backdrop-blur-md z-10"
                              >
                                {(searchQuery.trim() !== "" || expandedCategories.includes(sub.displayName || sub.name)) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                              </button>
                           </div>
                           
                           {(searchQuery.trim() !== "" || expandedCategories.includes(sub.displayName || sub.name)) && (
                             <motion.div
                               initial={{ opacity: 0, height: 0 }}
                               animate={{ opacity: 1, height: "auto" }}
                               exit={{ opacity: 0, height: 0 }}
                               className="overflow-hidden relative"
                             >
                                <p className="text-sm font-light text-white/40 mb-8 pb-6 border-b border-white/5">{sub.desc}</p>
                                
                                <div className="flex flex-col gap-4">
                                   {sub.items.map((item: any, j: number) => (`;

code = code.replace(target1, replace1);

const target2 = `                                    </div>
                                 </div>
                              ))}
                           </div>
                        </motion.div>
                     ))}
                  </AnimatePresence>`;

const replace2 = `                                    </div>
                                 </div>
                              ))}
                           </div>
                             </motion.div>
                           )}
                        </motion.div>
                     ))}
                  </AnimatePresence>`;

code = code.replace(target2, replace2);

const target3 = `                                       <button 
                                         onClick={() => toggleService(item.name, item.price)}`;
const replace3 = `                                       <button 
                                         onClick={(e) => {
                                           e.stopPropagation();
                                           toggleService(item.name, item.price);
                                         }}`;
// We will replace all occurrences.
code = code.split(target3).join(replace3);

fs.writeFileSync('src/pages/Services.tsx', code);
console.log("Done");
