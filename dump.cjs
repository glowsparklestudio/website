const fs = require('fs');
let code = fs.readFileSync('src/pages/Services.tsx', 'utf8');
const lines = code.split('\n');
console.log(lines.slice(370, 420).join('\n'));
