const fs = require('fs');
const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const initial = content;
  content = content.replace(/rgba\(183,\s*28,\s*28/g, 'rgba(212,175,55');
  if (content !== initial) {
    fs.writeFileSync(f, content);
  }
});
console.log("Updated rgba values.");
