const fs = require('fs');
let code = fs.readFileSync('src/pages/Services.tsx', 'utf8');

code = code.replace(/<\motion\.div\s*\n\s*layout\s*\n\s*className="columns-1 lg:columns-2 gap-8 lg:gap-12"/g, '<motion.div\n                 layout="position"\n                 className="columns-1 lg:columns-2 gap-8 lg:gap-12"');

fs.writeFileSync('src/pages/Services.tsx', code);
console.log("Replaced outer layout!");
