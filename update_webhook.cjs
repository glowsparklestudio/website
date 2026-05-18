const fs = require('fs');
const files = ['src/pages/Contest.tsx', 'src/pages/Book.tsx', 'src/pages/Services.tsx', 'src/Layout.tsx', '.env.example'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/VITE_GOOGLE_SHEETS_WEBHOOK_URL \|\| "";/g, 'VITE_GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbwxlUBlAaOC-d5qiCwVuwYjOsUHBNZCoTpCPHrb8jrW0tzpJG2XnJ-jFkZpbgVTondx/exec";');
    c = c.replace(/VITE_GOOGLE_SHEETS_WEBHOOK_URL="YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL"/g, 'VITE_GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/AKfycbwxlUBlAaOC-d5qiCwVuwYjOsUHBNZCoTpCPHrb8jrW0tzpJG2XnJ-jFkZpbgVTondx/exec"');
    fs.writeFileSync(f, c);
  }
});
console.log("Updated webhook URLs successfully.");
