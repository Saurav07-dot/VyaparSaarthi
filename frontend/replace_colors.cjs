const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.css') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace hex colors with modern zinc utility classes
    content = content.replace(/\[#0B0F19\]/gi, 'zinc-950');
    content = content.replace(/\[#121624\]/gi, 'zinc-900');
    content = content.replace(/\[#101323\]/gi, 'zinc-900');
    content = content.replace(/\[#0F1320\]/gi, 'zinc-900');
    content = content.replace(/\[#1A1D2D\]/gi, 'zinc-900');
    content = content.replace(/\[#151A2A\]/gi, 'zinc-800');
    content = content.replace(/\[#1A1C30\]/gi, 'zinc-800');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
