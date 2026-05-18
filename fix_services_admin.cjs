const fs = require('fs');

const path = 'src/pages/Services.tsx';
let content = fs.readFileSync(path, 'utf8');

// The file has const serviceMenu = [ ... ]; ending just before export default function ServicesPage() { ... }
// We can use regex or string replace.
const exportIndex = content.indexOf('export default function ServicesPage');

const startCode = content.substring(0, exportIndex);

// Add import from useAdmin
const newStartCode = startCode.replace(
  "import { cn } from '../Layout';",
  "import { cn } from '../Layout';\nimport { useAdmin } from '../contexts/AdminContext';"
).replace('const serviceMenu = [', 'const defaultServiceMenu = [');

let newContent = newStartCode + content.substring(exportIndex);

// inject hook
newContent = newContent.replace(
  'export default function ServicesPage() {',
  'export default function ServicesPage() {\n  const { data: adminData } = useAdmin();\n  const serviceMenu = adminData.serviceMenu && adminData.serviceMenu.length > 0 ? adminData.serviceMenu : defaultServiceMenu;'
);

fs.writeFileSync(path, newContent);
console.log("Services.tsx updated");
