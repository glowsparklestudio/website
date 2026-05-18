const fs = require('fs');
let code = fs.readFileSync('src/pages/Services.tsx', 'utf8');

const t2 = `                              ))}
                           </div>
                        </motion.div>
                     ))}
                  </AnimatePresence>`;

const r2 = `                              ))}
                           </div>
                            </motion.div>
                           )}
                        </motion.div>
                     ))}
                  </AnimatePresence>`;

code = code.replace(/                              \}\)\)\}[\s\S]*?<\/div>[\s\S]*?<\/motion\.div>[\s\S]*?\}\)\}[\s\S]*?<\/AnimatePresence>/g, `                              ))}
                           </div>
                            </motion.div>
                           )}
                        </motion.div>
                     ))}
                  </AnimatePresence>`);
fs.writeFileSync('src/pages/Services.tsx', code);
