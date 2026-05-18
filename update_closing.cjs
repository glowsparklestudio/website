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

code = code.replace(t2, r2);
fs.writeFileSync('src/pages/Services.tsx', code);
