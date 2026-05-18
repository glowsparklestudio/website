const fs = require('fs');

const filesToUpdate = [
  'src/pages/Gallery.tsx',
  'src/pages/Contest.tsx',
  'src/pages/Contact.tsx',
  'src/pages/Home.tsx',
  'src/pages/Testimonials.tsx',
  'src/pages/About.tsx',
  'src/pages/Services.tsx',
  'src/pages/WhyUs.tsx',
  'src/pages/Bridal.tsx',
  'src/Layout.tsx',
  'src/pages/Book.tsx'
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/Vivaan Premium Luxury Salon/gi, 'Glow Sparkle Studio');
    content = content.replace(/VivaanSalon/gi, 'GlowSparkleStudio');
    content = content.replace(/Vivaan'?s?/gi, 'Glow Sparkle Studio');
    
    // Also phone numbers
    content = content.replace(/720\s*717\s*4747/g, '800 838 5383');

    fs.writeFileSync(file, content);
  }
});
