const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf8'));

data.forEach(p => {
  // If product name has diameter like "Ø16mm" or "Ø 16mm"
  const diaMatch = p.name.match(/Ø\s*(\d+)/);
  if (diaMatch && p.variants.length === 1 && p.variants[0].diameter_mm === 10 && p.variants[0].length_m === 50) {
    p.variants[0].diameter_mm = parseInt(diaMatch[1]);
    
    // Check if description has length like "450m"
    const lenMatch = p.description.match(/(\d+)m/);
    if (lenMatch) {
       p.variants[0].length_m = parseInt(lenMatch[1]);
    }
  }

  // Fix the bug where length was parsed as diameter because it was the only select
  if (p.category === 'Traktionswindenseile' && p.variants.length > 0) {
     const isDiaBug = p.variants.some(v => v.diameter_mm > 100);
     if (isDiaBug) {
        const correctDia = diaMatch ? parseInt(diaMatch[1]) : 14;
        p.variants.forEach(v => {
           v.length_m = v.diameter_mm; // Move the huge numbers to length
           v.diameter_mm = correctDia;
           v.sku = p.variants[0].sku.split('-').slice(0,2).join('-') + '-' + v.length_m;
        });
     }
  }
});

fs.writeFileSync('./src/data/products.json', JSON.stringify(data, null, 2));
